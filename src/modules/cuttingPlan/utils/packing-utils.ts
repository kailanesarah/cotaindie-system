export interface Piece {
  w: number;
  h: number;
  name: string;
  category_id: string;
  product_id?: {
    product_id: string;
    product_category: string;
  };
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  name?: string;
  rotated?: boolean;
  oversize?: boolean;
  margin?: number; // margem de segurança
}

export interface Sheet {
  w: number;
  h: number;
  freeRects: Rect[];
  usedRects: Rect[];
}

// Packing MaxRects com margem
export function packMaxRects(
  sheetW: number,
  sheetH: number,
  items: Piece[],
  margin = 0,
  allowRotate = true,
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
    if (placed.x > freeRect.x + epsilon) {
      splits.push({
        x: freeRect.x,
        y: freeRect.y,
        w: placed.x - freeRect.x,
        h: freeRect.h,
      });
    }
    if (placed.x + placed.w < freeRect.x + freeRect.w - epsilon) {
      splits.push({
        x: placed.x + placed.w,
        y: freeRect.y,
        w: freeRect.x + freeRect.w - (placed.x + placed.w),
        h: freeRect.h,
      });
    }
    if (placed.y > freeRect.y + epsilon) {
      splits.push({
        x: freeRect.x,
        y: freeRect.y,
        w: freeRect.w,
        h: placed.y - freeRect.y,
      });
    }
    if (placed.y + placed.h < freeRect.y + freeRect.h - epsilon) {
      splits.push({
        x: freeRect.x,
        y: placed.y + placed.h,
        w: freeRect.w,
        h: freeRect.y + freeRect.h - (placed.y + placed.h),
      });
    }
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
    let newFreeRects: Rect[] = [];
    sheet.freeRects.forEach((fr) => {
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
    });
    pruneFreeRects(newFreeRects);
    sheet.freeRects = newFreeRects;
  }

  function findPosition(sheet: Sheet, w: number, h: number): Rect | null {
    let best: Rect | null = null;
    let bestScore = Infinity;

    const options = allowRotate
      ? [
          { w, h, rotated: false },
          { w: h, h: w, rotated: true },
        ]
      : [{ w, h, rotated: false }];

    for (const fr of sheet.freeRects) {
      for (const opt of options) {
        const totalW = opt.w + 2 * margin;
        const totalH = opt.h + 2 * margin;
        if (fits(fr, totalW, totalH)) {
          const leftover = (fr.w - totalW) * (fr.h - totalH);
          if (leftover < bestScore) {
            bestScore = leftover;
            best = {
              ...opt,
              x: fr.x + margin,
              y: fr.y + margin,
              margin: margin,
            };
          }
        }
      }
    }
    return best;
  }

  items = items.slice().sort((a, b) => Math.max(b.w, b.h) - Math.max(a.w, a.h));

  for (const item of items) {
    let placed = false;
    for (const sheet of sheets) {
      const node = findPosition(sheet, item.w, item.h);
      if (node) {
        node.name = item.name;
        placeRect(sheet, node);
        placed = true;
        break;
      }
    }
    if (!placed) {
      const newSheet = createSheet();
      const node = findPosition(newSheet, item.w, item.h);
      if (node) {
        node.name = item.name;
        placeRect(newSheet, node);
      } else {
        // Caso não caiba, adiciona como oversize
        newSheet.usedRects.push({
          x: margin,
          y: margin,
          w: item.w,
          h: item.h,
          name: item.name,
          oversize: true,
          margin: margin,
        });
      }
      sheets.push(newSheet);
    }
  }

  return sheets;
}
