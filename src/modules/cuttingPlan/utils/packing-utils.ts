// Algoritmo Maximal Rectangles
// Item/peça
export interface Piece {
  w: number;
  h: number;
  name: string;
}

// Retângulo usado ou livre na chapa
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  name?: string;
  rotated?: boolean;
  oversize?: boolean;
}

// Chapa/Sheet
export interface Sheet {
  w: number;
  h: number;
  freeRects: Rect[];
  usedRects: Rect[];
}

/**
 * Função principal do Maximal Rectangles
 */
export function packMaxRects(
  sheetW: number,
  sheetH: number,
  items: Piece[],
  allowRotate: boolean,
  margin: number,
): Sheet[] {
  const sheets: Sheet[] = [];

  // Cria uma nova folha
  function createSheet(): Sheet {
    return {
      w: sheetW,
      h: sheetH,
      freeRects: [
        {
          x: margin,
          y: margin,
          w: sheetW - 2 * margin,
          h: sheetH - 2 * margin,
        },
      ],
      usedRects: [],
    };
  }

  // Verifica se o retângulo cabe na área livre
  function rectFits(freeRect: Rect, w: number, h: number): boolean {
    return w <= freeRect.w + 1e-9 && h <= freeRect.h + 1e-9;
  }

  // Verifica se dois retângulos se intersectam
  function rectIntersect(a: Rect, b: Rect): boolean {
    return !(
      a.x + a.w <= b.x + 1e-9 ||
      b.x + b.w <= a.x + 1e-9 ||
      a.y + a.h <= b.y + 1e-9 ||
      b.y + b.h <= a.y + 1e-9
    );
  }

  // Divide um retângulo livre após colocar um retângulo
  function splitFreeRect(freeRect: Rect, placedRect: Rect): Rect[] {
    const splits: Rect[] = [];
    if (!rectIntersect(freeRect, placedRect)) return [freeRect];

    // Cima
    if (placedRect.y > freeRect.y)
      splits.push({
        x: freeRect.x,
        y: freeRect.y,
        w: freeRect.w,
        h: placedRect.y - freeRect.y,
      });
    // Baixo
    const bottomY = placedRect.y + placedRect.h;
    const freeBottomY = freeRect.y + freeRect.h;
    if (bottomY < freeBottomY)
      splits.push({
        x: freeRect.x,
        y: bottomY,
        w: freeRect.w,
        h: freeBottomY - bottomY,
      });
    // Esquerda
    if (placedRect.x > freeRect.x)
      splits.push({
        x: freeRect.x,
        y: freeRect.y,
        w: placedRect.x - freeRect.x,
        h: freeRect.h,
      });
    // Direita
    const rightX = placedRect.x + placedRect.w;
    const freeRightX = freeRect.x + freeRect.w;
    if (rightX < freeRightX)
      splits.push({
        x: rightX,
        y: freeRect.y,
        w: freeRightX - rightX,
        h: freeRect.h,
      });

    return splits.filter((r) => r.w > 1e-9 && r.h > 1e-9);
  }

  // Remove retângulos livres que estão totalmente contidos em outro
  function pruneFreeRects(freeRects: Rect[]) {
    for (let i = freeRects.length - 1; i >= 0; i--) {
      const a = freeRects[i];
      for (let j = 0; j < freeRects.length; j++) {
        if (i === j) continue;
        const b = freeRects[j];
        if (
          a.x >= b.x &&
          a.y >= b.y &&
          a.x + a.w <= b.x + b.w &&
          a.y + a.h <= b.y + b.h
        ) {
          freeRects.splice(i, 1);
          break;
        }
      }
    }
  }

  // Encontra a melhor posição para um novo retângulo
  function findPositionForNewNode(
    sheet: Sheet,
    w: number,
    h: number,
    allowRotate: boolean,
  ): Rect | null {
    let bestNode: Rect | null = null;
    let bestShortSideFit = Infinity;
    let bestLongSideFit = Infinity;

    for (const freeRect of sheet.freeRects) {
      const rotations = allowRotate
        ? [
            [w, h],
            [h, w],
          ]
        : [[w, h]];
      for (const [rw, rh] of rotations) {
        if (!rectFits(freeRect, rw, rh)) continue;
        const leftoverHoriz = Math.abs(freeRect.w - rw);
        const leftoverVert = Math.abs(freeRect.h - rh);
        const shortSideFit = Math.min(leftoverHoriz, leftoverVert);
        const longSideFit = Math.max(leftoverHoriz, leftoverVert);
        if (
          shortSideFit < bestShortSideFit ||
          (shortSideFit === bestShortSideFit && longSideFit < bestLongSideFit)
        ) {
          bestNode = {
            x: freeRect.x,
            y: freeRect.y,
            w: rw,
            h: rh,
            rotated: rw !== w,
          };
          bestShortSideFit = shortSideFit;
          bestLongSideFit = longSideFit;
        }
      }
    }

    return bestNode;
  }

  // Coloca o retângulo na folha e atualiza retângulos livres
  function placeRect(sheet: Sheet, rect: Rect) {
    sheet.usedRects.push(rect);
    let newFreeRects: Rect[] = [];
    for (const freeRect of sheet.freeRects) {
      newFreeRects.push(...splitFreeRect(freeRect, rect));
    }
    sheet.freeRects = newFreeRects;
    pruneFreeRects(sheet.freeRects);
  }

  // Ordena itens do maior para o menor
  items = items.slice().sort((a, b) => b.w * b.h - a.w * a.h);

  for (const it of items) {
    let placed = false;
    for (const sheet of sheets) {
      const node = findPositionForNewNode(sheet, it.w, it.h, allowRotate);
      if (node) {
        placeRect(sheet, { ...node, name: it.name });
        placed = true;
        break;
      }
    }
    if (!placed) {
      const newSheet = createSheet();
      const node = findPositionForNewNode(newSheet, it.w, it.h, allowRotate);
      if (node) placeRect(newSheet, { ...node, name: it.name });
      else
        newSheet.usedRects.push({
          x: 0,
          y: 0,
          w: it.w,
          h: it.h,
          name: it.name,
          oversize: true,
        });
      sheets.push(newSheet);
    }
  }

  return sheets;
}

/**
 * Calcula a eficiência do empacotamento
 */
export function calcEfficiency(sheets: Sheet[]): number {
  let usedArea = 0;
  let totalArea = 0;
  for (const s of sheets) {
    totalArea += s.w * s.h;
    for (const u of s.usedRects) if (!u.oversize) usedArea += u.w * u.h;
  }
  return usedArea / totalArea || 0;
}
