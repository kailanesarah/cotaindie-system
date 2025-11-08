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

    for (const s of this.sheets) {
      let usedAreaOnThisSheet = s.usedRects.reduce(
        (sum, u) => sum + (u.oversize ? 0 : u.w * u.h),
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
      totalIntegerSheets: this.sheets.length,
    };

    if (options.includeImages) {
      const fullResult: ResultsFull = {
        ...result,
        base64Images: base64Images,
      };
      return fullResult;
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

    if (!ctx) {
      console.error(
        "Não foi possível obter o contexto 2D para exportar a imagem.",
      );
      return "";
    }

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

    ctx.textBaseline = "top";

    for (const u of sheet.usedRects) {
      const x = u.x * scaleX + padding,
        y = u.y * scaleY + padding,
        w = u.w * scaleX,
        h = u.h * scaleY;

      ctx.fillStyle = u.oversize ? "#666666" : "#CCCCCC";
      ctx.fillRect(x + 0.5, y + 0.5, w - 1, h - 1);
      ctx.strokeStyle = "#000000";
      ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);

      ctx.fillStyle = "#000000";
      const label = u.name;
      const originalW = u.rotated ? u.h : u.w;
      const originalH = u.rotated ? u.w : u.h;

      const widthLabel = `${(Math.round(originalW * 100) / 100).toString()} ${unit}`;
      const heightLabel = `${(Math.round(originalH * 100) / 100).toString()} ${unit}`;

      ctx.save();
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const mainLabelX = x + w / 2;
      const mainLabelY = y + h / 2;
      if (h > w && h > 30) {
        ctx.translate(mainLabelX, mainLabelY);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(label, 0, 0, h - 8);
      } else {
        ctx.fillText(label, mainLabelX, mainLabelY, w - 8);
      }
      ctx.restore();

      ctx.font = "16px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(widthLabel, x + w / 2, y + 5, w - 8);

      ctx.save();
      ctx.font = "16px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.translate(x + w - 15, y + h / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(heightLabel, 0, 0, h - 8);
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
        const node = this.#findPositionForNewNode(
          sheet,
          item.w,
          item.h,
          allowRotate,
          pieceSpacing,
        );
        if (node) {
          this.#placeRect(
            sheet,
            { ...node, name: item.name || "Peça" },
            pieceSpacing,
          );
          placed = true;
          break;
        }
      }
      if (!placed) {
        const newSheet = this.#createSheet(sheetW, sheetH, margin);
        const node = this.#findPositionForNewNode(
          newSheet,
          item.w,
          item.h,
          allowRotate,
          pieceSpacing,
        );
        if (node) {
          this.#placeRect(
            newSheet,
            { ...node, name: item.name || "Peça" },
            pieceSpacing,
          );
        } else {
          newSheet.usedRects.push({
            x: 0,
            y: 0,
            w: item.w,
            h: item.h,
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

    const spacedRect = {
      ...rect,
      w: rect.w + (rect.oversize ? 0 : pieceSpacing),
      h: rect.h + (rect.oversize ? 0 : pieceSpacing),
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
  ): Omit<PlacedRect, "name" | "oversize"> | null => {
    let bestNode: Omit<PlacedRect, "name" | "oversize"> | null = null;
    let bestShortSideFit = Infinity;
    let bestLongSideFit = Infinity;

    const spacedW = w + pieceSpacing;
    const spacedH = h + pieceSpacing;

    for (const freeRect of sheet.freeRects) {
      if (this.#rectFits(freeRect, spacedW, spacedH)) {
        const leftoverHoriz = Math.abs(freeRect.w - spacedW);
        const leftoverVert = Math.abs(freeRect.h - spacedH);
        const shortSideFit = Math.min(leftoverHoriz, leftoverVert);
        const longSideFit = Math.max(leftoverHoriz, leftoverVert);

        if (
          shortSideFit < bestShortSideFit ||
          (shortSideFit === bestShortSideFit && longSideFit < bestLongSideFit)
        ) {
          bestNode = {
            x: freeRect.x,
            y: freeRect.y,
            w: w,
            h: h,
            rotated: false,
          };
          bestShortSideFit = shortSideFit;
          bestLongSideFit = longSideFit;
        }
      }

      if (allowRotate && this.#rectFits(freeRect, spacedH, spacedW)) {
        const leftoverHoriz = Math.abs(freeRect.w - spacedH);
        const leftoverVert = Math.abs(freeRect.h - spacedW);
        const shortSideFit = Math.min(leftoverHoriz, leftoverVert);
        const longSideFit = Math.max(leftoverHoriz, leftoverVert);

        if (
          shortSideFit < bestShortSideFit ||
          (shortSideFit === bestShortSideFit && longSideFit < bestLongSideFit)
        ) {
          bestNode = {
            x: freeRect.x,
            y: freeRect.y,
            w: h,
            h: w,
            rotated: true,
          };
          bestShortSideFit = shortSideFit;
          bestLongSideFit = longSideFit;
        }
      }
    }
    return bestNode;
  };

  readonly #rectFits = (freeRect: FreeRect, w: number, h: number): boolean =>
    w <= freeRect.w + 1e-9 && h <= freeRect.h + 1e-9;

  readonly #rectIntersect = (a: Rect, b: Rect): boolean =>
    !(
      a.x + a.w <= b.x + 1e-9 ||
      b.x + b.w <= a.x + 1e-9 ||
      a.y + a.h <= b.y + 1e-9 ||
      b.y + b.h <= a.y + 1e-9
    );

  readonly #splitFreeRect = (
    freeRect: FreeRect,
    placedRect: Rect,
  ): FreeRect[] => {
    if (!this.#rectIntersect(freeRect, placedRect)) return [freeRect];

    const splits: FreeRect[] = [];

    if (placedRect.y > freeRect.y + 1e-9)
      splits.push({
        x: freeRect.x,
        y: freeRect.y,
        w: freeRect.w,
        h: placedRect.y - freeRect.y,
      });

    const bottomY = placedRect.y + placedRect.h;
    const freeBottomY = freeRect.y + freeRect.h;
    if (bottomY < freeBottomY - 1e-9)
      splits.push({
        x: freeRect.x,
        y: bottomY,
        w: freeRect.w,
        h: freeBottomY - bottomY,
      });

    if (placedRect.x > freeRect.x + 1e-9)
      splits.push({
        x: freeRect.x,
        y: freeRect.y,
        w: placedRect.x - freeRect.x,
        h: freeRect.h,
      });

    const rightX = placedRect.x + placedRect.w;
    const freeRightX = freeRect.x + freeRect.w;
    if (rightX < freeRightX - 1e-9)
      splits.push({
        x: rightX,
        y: freeRect.y,
        w: freeRightX - rightX,
        h: freeRect.h,
      });

    return splits.filter((r) => r.w > 1e-9 && r.h > 1e-9);
  };

  readonly #pruneFreeRects = (freeRects: FreeRect[]): void => {
    for (let i = freeRects.length - 1; i >= 0; i--) {
      const a = freeRects[i];
      for (let j = 0; j < freeRects.length; j++) {
        if (i === j) continue;
        const b = freeRects[j];
        if (
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
