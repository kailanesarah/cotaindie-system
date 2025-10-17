import type { Piece } from "../schemas/sheet-types";

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  name?: string;
  rotated?: boolean;
  oversize?: boolean;
  margin?: number;
}

export interface Sheet {
  w: number;
  h: number;
  freeRects: Rect[];
  usedRects: Rect[];
}

/**
 * Algoritmo MaxRects:
 * - Respeita margem
 * - Rotaciona apenas se allowRotateGlobal === true
 * - Realoca peças em novas chapas se não couberem
 * - Oversize se peça > chapa
 */
export function packMaxRects(
  sheetW: number,
  sheetH: number,
  items: Piece[],
  margin = 0,
  allowRotateGlobal = false, // novo parâmetro
): Sheet[] {
  const sheets: Sheet[] = [];
  const epsilon = 1e-6;

  function createSheet(): Sheet {
    return {
      w: sheetW,
      h: sheetH,
      freeRects: [{ x: 0, y: 0, w: sheetW, h: sheetH }],
      usedRects: [],
    };
  }

  function fits(freeRect: Rect, w: number, h: number) {
    return w <= freeRect.w + epsilon && h <= freeRect.h + epsilon;
  }

  function splitFreeRect(freeRect: Rect, placed: Rect): Rect[] {
    const splits: Rect[] = [];
    if (placed.x > freeRect.x + epsilon)
      splits.push({
        x: freeRect.x,
        y: freeRect.y,
        w: placed.x - freeRect.x,
        h: freeRect.h,
      });
    if (placed.x + placed.w < freeRect.x + freeRect.w - epsilon)
      splits.push({
        x: placed.x + placed.w,
        y: freeRect.y,
        w: freeRect.x + freeRect.w - (placed.x + placed.w),
        h: freeRect.h,
      });
    if (placed.y > freeRect.y + epsilon)
      splits.push({
        x: freeRect.x,
        y: freeRect.y,
        w: freeRect.w,
        h: placed.y - freeRect.y,
      });
    if (placed.y + placed.h < freeRect.y + freeRect.h - epsilon)
      splits.push({
        x: freeRect.x,
        y: placed.y + placed.h,
        w: freeRect.w,
        h: freeRect.y + freeRect.h - (placed.y + placed.h),
      });

    return splits.filter((r) => r.w > epsilon && r.h > epsilon);
  }

  function pruneFreeRects(freeRects: Rect[]) {
    for (let i = freeRects.length - 1; i >= 0; i--) {
      const a = freeRects[i];
      for (let j = 0; j < freeRects.length; j++) {
        if (i === j) continue;
        const b = freeRects[j];
        if (
          a.x >= b.x - epsilon &&
          a.y >= b.y - epsilon &&
          a.x + a.w <= b.x + b.w + epsilon &&
          a.y + a.h <= b.y + b.h + epsilon
        ) {
          freeRects.splice(i, 1);
          break;
        }
      }
    }
  }

  function placeRect(sheet: Sheet, rect: Rect) {
    sheet.usedRects.push(rect);
    const newFreeRects: Rect[] = [];
    for (const fr of sheet.freeRects) {
      if (
        fr.x < rect.x + rect.w - epsilon &&
        fr.x + fr.w > rect.x + epsilon &&
        fr.y < rect.y + rect.h - epsilon &&
        fr.y + fr.h > rect.y + epsilon
      ) {
        newFreeRects.push(...splitFreeRect(fr, rect));
      } else {
        newFreeRects.push(fr);
      }
    }
    pruneFreeRects(newFreeRects);
    sheet.freeRects = newFreeRects;
  }

  function findBestPosition(sheet: Sheet, item: Piece): Rect | null {
    let best: Rect | null = null;
    let bestWaste = Infinity;

    // usa a rotação global
    const orientations = allowRotateGlobal
      ? [
          { w: item.width, h: item.height, rotated: false },
          { w: item.height, h: item.width, rotated: true },
        ]
      : [{ w: item.width, h: item.height, rotated: false }];

    for (const opt of orientations) {
      if (opt.w + 2 * margin > sheet.w || opt.h + 2 * margin > sheet.h)
        continue;

      for (const fr of sheet.freeRects) {
        const totalW = opt.w + 2 * margin;
        const totalH = opt.h + 2 * margin;
        if (!fits(fr, totalW, totalH)) continue;

        const x = fr.x + margin;
        const y = fr.y + margin;
        const waste = fr.w * fr.h - totalW * totalH;

        if (waste < bestWaste) {
          bestWaste = waste;
          best = {
            x,
            y,
            w: opt.w,
            h: opt.h,
            rotated: opt.rotated,
            name: item.name,
            margin,
          };
        }
      }
    }

    return best;
  }

  // ordena do maior para o menor
  const sortedItems = items
    .slice()
    .sort((a, b) => b.width * b.height - a.width * a.height);

  for (const item of sortedItems) {
    let placed = false;

    for (const sheet of sheets) {
      const rect = findBestPosition(sheet, item);
      if (rect) {
        placeRect(sheet, rect);
        placed = true;
        break;
      }
    }

    if (!placed) {
      const newSheet = createSheet();
      const rect = findBestPosition(newSheet, item);
      if (rect) {
        placeRect(newSheet, rect);
      } else {
        newSheet.usedRects.push({
          x: margin,
          y: margin,
          w: item.width,
          h: item.height,
          name: item.name,
          oversize: true,
          margin,
        });
      }
      sheets.push(newSheet);
    }
  }

  return sheets;
}
