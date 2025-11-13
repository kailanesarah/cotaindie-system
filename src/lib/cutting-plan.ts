interface PieceMeasures {
  name?: string;
  w: number;
  h: number;
}

interface OptimizerConfig {
  sheetW: number;
  sheetH: number;
  items: PieceMeasures[];
  margin: number;
  pieceSpacing: number;
  allowRotate: boolean;
  wastePercentage: number;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

type FreeRect = Rect;

interface PlacedRect extends Rect {
  name: string;
  rotated: boolean;
  origW: number;
  origH: number;
  drawnW: number;
  drawnH: number;
  oversize?: boolean;
}

interface Sheet {
  w: number;
  h: number;
  freeRects: FreeRect[];
  usedRects: PlacedRect[];
}

interface ResultsLite {
  utilizationPerSheet: number[];
  totalFractionalSheets: number;
  totalIntegerSheets: number;
}

interface ResultsFull extends ResultsLite {
  base64Images: string[];
}

export class CuttingPlan {
  private readonly sheets: Sheet[] = [];
  private readonly config: OptimizerConfig;

  constructor(config: OptimizerConfig) {
    this.config = config;

    const { sheetW, sheetH, items, margin, pieceSpacing, allowRotate } = config;

    this.sheets = this.#packMaxRects(
      sheetW,
      sheetH,
      items,
      allowRotate,
      margin,
      pieceSpacing,
    );
  }

  public calculate({ includeImages }: { includeImages: boolean }): ResultsFull {
    return this.#calculateResults({ includeImages }) as ResultsFull;
  }

  #calculateResults(options: {
    includeImages: boolean;
  }): ResultsLite | ResultsFull {
    const { sheetW, sheetH, wastePercentage } = this.config;
    const wasteThreshold = (wastePercentage || 0) / 100;
    const base64Images: string[] = [];
    const utilizationPerSheet: number[] = [];
    let totalFractionalSheets = 0;
    const sheetTotalArea = sheetW * sheetH;

    let count = 0;

    for (const s of this.sheets) {
      count++;

      let usedAreaOnThisSheet = s.usedRects.reduce(
        (sum, u) => sum + (u.oversize ? 0 : u.origW * u.origH),
        0,
      );

      let utilization = usedAreaOnThisSheet / sheetTotalArea;
      if (1 - utilization > 0 && 1 - utilization <= wasteThreshold) {
        utilization = 1.0;
      }

      utilizationPerSheet.push(utilization);
      totalFractionalSheets += utilization;

      if (options.includeImages) {
        base64Images.push(this.#generateBase64Image(s, sheetW, sheetH));
      }
    }

    const result: ResultsLite = {
      utilizationPerSheet,
      totalFractionalSheets,
      totalIntegerSheets: count,
    };

    if (options.includeImages) {
      return { ...result, base64Images };
    }

    return result;
  }

  #generateBase64Image(sheet: Sheet, sheetW: number, sheetH: number): string {
    if (typeof document === "undefined") {
      console.warn("Trying to generate canvas on server. Skipping...");
      return "";
    }

    const unit = "cm";
    const exportCanvas = document.createElement("canvas");
    const ctx = exportCanvas.getContext("2d");
    const padding = 20;

    if (!ctx) return "";

    exportCanvas.width = 1200;
    exportCanvas.height =
      Math.round(exportCanvas.width * (sheetH / sheetW)) + padding * 2;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.strokeRect(
      padding,
      padding,
      exportCanvas.width - padding * 2,
      exportCanvas.height - padding * 2,
    );

    const scaleX = (exportCanvas.width - padding * 2) / sheetW;
    const scaleY = (exportCanvas.height - padding * 2) / sheetH;

    for (const u of sheet.usedRects) {
      const x = u.x * scaleX + padding;
      const y = u.y * scaleY + padding;
      const w = u.drawnW * scaleX;
      const h = u.drawnH * scaleY;

      ctx.fillStyle = u.oversize ? "#666666" : "#CCCCCC";
      ctx.fillRect(x + 0.5, y + 0.5, w - 1, h - 1);
      ctx.strokeStyle = "#000000";
      ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);

      ctx.fillStyle = "#000000";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (u.rotated && h > w) {
        ctx.save();
        ctx.translate(x + w / 2, y + h / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(u.name, 0, 0, h - 8);
        ctx.restore();
      } else {
        ctx.fillText(u.name, x + w / 2, y + h / 2, w - 8);
      }

      const widthLabel = `${u.rotated ? u.origH : u.origW} ${unit}`;
      const heightLabel = `${u.rotated ? u.origW : u.origH} ${unit}`;

      ctx.font = "16px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(widthLabel, x + w / 2, y + 5, Math.max(0, w - 8));

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.translate(x + w - 12, y + h / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(heightLabel, 0, 0, Math.max(0, h - 8));
      ctx.restore();
    }

    return exportCanvas.toDataURL("image/png");
  }

  readonly #packMaxRects = (
    sheetW: number,
    sheetH: number,
    items: PieceMeasures[],
    allowRotate: boolean,
    margin: number,
    pieceSpacing: number,
  ): Sheet[] => {
    const sheets: Sheet[] = [];
    const sortedItems = items.slice().sort((a, b) => b.w * b.h - a.w * a.h);

    for (const item of sortedItems) {
      let placed = false;

      for (const sheet of sheets) {
        const pos = this.#findPositionForNewNode(
          sheet,
          item.w,
          item.h,
          allowRotate,
          pieceSpacing,
        );

        if (pos) {
          this.#placeRect(
            sheet,
            {
              ...pos,
              origW: item.w,
              origH: item.h,
              drawnW: pos.rotated ? item.h : item.w,
              drawnH: pos.rotated ? item.w : item.h,
              name: item.name || "Peça",
            },
            pieceSpacing,
          );
          placed = true;
          break;
        }
      }

      if (!placed) {
        const newSheet = this.#createSheet(sheetW, sheetH, margin);
        const pos = this.#findPositionForNewNode(
          newSheet,
          item.w,
          item.h,
          allowRotate,
          pieceSpacing,
        );

        if (pos) {
          this.#placeRect(
            newSheet,
            {
              ...pos,
              origW: item.w,
              origH: item.h,
              drawnW: pos.rotated ? item.h : item.w,
              drawnH: pos.rotated ? item.w : item.h,
              name: item.name || "Peça",
            },
            pieceSpacing,
          );
        } else {
          newSheet.usedRects.push({
            x: 0,
            y: 0,
            w: item.w,
            h: item.h,
            drawnW: item.w,
            drawnH: item.h,
            origW: item.w,
            origH: item.h,
            name: item.name || "Peça",
            oversize: true,
            rotated: false,
          });
        }

        sheets.push(newSheet);
      }
    }

    return sheets;
  };

  readonly #createSheet = (
    sheetW: number,
    sheetH: number,
    margin: number,
  ): Sheet => ({
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
  });

  readonly #placeRect = (
    sheet: Sheet,
    rect: PlacedRect,
    pieceSpacing: number,
  ): void => {
    sheet.usedRects.push(rect);

    const spacedRect: Rect = {
      x: rect.x,
      y: rect.y,
      w: rect.drawnW + (rect.oversize ? 0 : pieceSpacing),
      h: rect.drawnH + (rect.oversize ? 0 : pieceSpacing),
    };

    let newFreeRects: FreeRect[] = [];

    for (const freeRect of sheet.freeRects) {
      newFreeRects.push(...this.#splitFreeRect(freeRect, spacedRect));
    }

    sheet.freeRects = newFreeRects;
    this.#pruneFreeRects(sheet.freeRects);
  };

  readonly #findPositionForNewNode = (
    sheet: Sheet,
    w: number,
    h: number,
    allowRotate: boolean,
    pieceSpacing: number,
  ) => {
    let bestNode = null;
    let bestY = Infinity;
    let bestX = Infinity;

    const spacedW = w + pieceSpacing;
    const spacedH = h + pieceSpacing;

    for (const freeRect of sheet.freeRects) {
      if (this.#rectFits(freeRect, spacedW, spacedH)) {
        if (
          freeRect.y < bestY ||
          (freeRect.y === bestY && freeRect.x < bestX)
        ) {
          bestNode = { x: freeRect.x, y: freeRect.y, w, h, rotated: false };
          bestY = freeRect.y;
          bestX = freeRect.x;
        }
      }

      if (allowRotate && this.#rectFits(freeRect, spacedH, spacedW)) {
        if (
          freeRect.y < bestY ||
          (freeRect.y === bestY && freeRect.x < bestX)
        ) {
          bestNode = { x: freeRect.x, y: freeRect.y, w, h, rotated: true };
          bestY = freeRect.y;
          bestX = freeRect.x;
        }
      }
    }

    return bestNode;
  };

  readonly #rectFits = (freeRect: Rect, w: number, h: number) =>
    w <= freeRect.w + 1e-9 && h <= freeRect.h + 1e-9;

  readonly #rectIntersect = (a: Rect, b: Rect) =>
    !(
      a.x + a.w <= b.x + 1e-9 ||
      b.x + b.w <= a.x + 1e-9 ||
      a.y + a.h <= b.y + 1e-9 ||
      b.y + b.h <= a.y + 1e-9
    );

  readonly #splitFreeRect = (freeRect: FreeRect, placedRect: Rect) => {
    if (!this.#rectIntersect(freeRect, placedRect)) return [freeRect];

    const splits: FreeRect[] = [];

    if (placedRect.y > freeRect.y + 1e-9)
      splits.push({
        x: freeRect.x,
        y: freeRect.y,
        w: freeRect.w,
        h: placedRect.y - freeRect.y,
      });

    if (placedRect.y + placedRect.h < freeRect.y + freeRect.h - 1e-9)
      splits.push({
        x: freeRect.x,
        y: placedRect.y + placedRect.h,
        w: freeRect.w,
        h: freeRect.y + freeRect.h - (placedRect.y + placedRect.h),
      });

    if (placedRect.x > freeRect.x + 1e-9)
      splits.push({
        x: freeRect.x,
        y: freeRect.y,
        w: placedRect.x - freeRect.x,
        h: freeRect.h,
      });

    if (placedRect.x + placedRect.w < freeRect.x + freeRect.w - 1e-9)
      splits.push({
        x: placedRect.x + placedRect.w,
        y: freeRect.y,
        w: freeRect.x + freeRect.w - (placedRect.x + placedRect.w),
        h: freeRect.h,
      });

    return splits.filter((r) => r.w > 1e-9 && r.h > 1e-9);
  };

  readonly #pruneFreeRects = (freeRects: FreeRect[]) => {
    for (let i = freeRects.length - 1; i >= 0; i--) {
      const a = freeRects[i];
      for (let j = 0; j < freeRects.length; j++) {
        const b = freeRects[j];
        if (
          i !== j &&
          a.x >= b.x - 1e-9 &&
          a.y >= b.y - 1e-9 &&
          a.x + a.w <= b.x + b.w + 1e-9 &&
          a.y + a.h <= b.y + b.h + 1e-9
        ) {
          freeRects.splice(i, 1);
          break;
        }
      }
    }
  };
}
