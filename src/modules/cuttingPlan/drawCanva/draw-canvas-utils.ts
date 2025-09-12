import { drawSheetsSVG, type SheetForDrawing } from "./draw-canvas";

// ----------------------------
// Formata sheets para desenho (genérico)
// ----------------------------
export function formatSheetsForDrawing<
  T extends {
    w: number;
    h: number;
    usedRects: Array<{
      x: number;
      y: number;
      w: number;
      h: number;
      name?: string;
      rotated?: boolean;
      oversize?: boolean;
      margin?: number;
    }>;
    freeRects?: Array<{ x: number; y: number; w: number; h: number }>;
  },
>(rawSheets: T[], margin: number): SheetForDrawing[] {
  try {
    return rawSheets.map((sheet) => ({
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
        margin: r.margin ?? margin,
      })),
      freeRects: sheet.freeRects,
    }));
  } catch (error) {
    console.error("Erro ao formatar sheets para desenho:", error);
    throw new Error("Falha ao formatar sheets para desenho");
  }
}

// ----------------------------
// Gera SVG de sheets (genérico)
// ----------------------------
export function generateSheetsSVG<
  T extends { w: number; h: number; usedRects: any[]; freeRects?: any[] },
>(rawSheets: T[], margin: number) {
  try {
    const sheetsForDrawing: SheetForDrawing[] = formatSheetsForDrawing(
      rawSheets,
      margin,
    );

    const { url } = drawSheetsSVG(sheetsForDrawing, 0.2, margin, true);

    if (!url) throw new Error("Erro ao gerar arquivo SVG");

    return { sheetsForDrawing, imageUrl: url };
  } catch (error) {
    console.error("Erro ao gerar SVG das sheets:", error);
    throw new Error("Falha ao gerar SVG das sheets");
  }
}
