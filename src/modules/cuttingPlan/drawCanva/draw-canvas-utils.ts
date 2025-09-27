import fs from "fs";
import os from "os";
import path from "path";
import { svgToBase64Png } from "../utils/convert-png-utils";
import { drawSheetsSVG, type SheetForDrawing } from "./draw-canvas-service";

export async function generateSheetsPNG<
  T extends { w: number; h: number; usedRects: any[]; freeRects?: any[] },
>(rawSheets: T[], defaultMargin: number) {
  // Formatar sheets
  const sheetsForDrawing: SheetForDrawing[] = rawSheets.map((sheet) => ({
    w: sheet.w,
    h: sheet.h,
    usedRects: sheet.usedRects.map((r) => ({
      x: r.x,
      y: r.y,
      w: r.w,
      h: r.h,
      name: r.name ?? "Sem nome",
      rotated: r.rotated ?? false,
      oversize: r.oversize ?? false,
      margin: typeof r.margin === "number" ? r.margin : defaultMargin,
    })),
    freeRects: sheet.freeRects,
  }));

  // Gerar SVG
  const { svg } = drawSheetsSVG(sheetsForDrawing, 0.2, defaultMargin);

  // Converter para PNG base64
  const base64Png = await svgToBase64Png(svg);

  // Salvar temporariamente no sistema
  const tmpDir = os.tmpdir();
  const tmpPath = path.join(tmpDir, `sheet_${Date.now()}.png`);
  const pngBuffer = Buffer.from(
    base64Png.replace(/^data:image\/png;base64,/, ""),
    "base64",
  );
  fs.writeFileSync(tmpPath, pngBuffer);

  return {
    sheetsForDrawing,
    base64Png,
    tmpPath, // caminho temporário, útil para logs ou download momentâneo
  };
}
