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
>(rawSheets: T[], defaultMargin: number): SheetForDrawing[] {
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
        // Garante que margin seja número
        margin: typeof r.margin === "number" ? r.margin : defaultMargin,
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
>(rawSheets: T[], defaultMargin: number) {
  try {
    const sheetsForDrawing: SheetForDrawing[] = formatSheetsForDrawing(
      rawSheets,
      defaultMargin,
    );

    // drawSheetsSVG agora retorna { svg, base64, filePath, url }
    const { svg, base64, filePath, url } = drawSheetsSVG(
      sheetsForDrawing,
      0.2,
      defaultMargin,
    );

    if (!svg || !url) {
      throw new Error("Erro ao gerar SVG ou URL de produção");
    }

    // Pode usar diretamente como <img src={url} /> ou <img src={base64} />
    const imageUrl = url; // link para produção
    const base64Url = base64; // base64 se precisar inline

    return { sheetsForDrawing, svg, filePath, imageUrl, base64Url };
  } catch (error) {
    console.error("Erro ao gerar SVG das sheets:", error);
    throw new Error("Falha ao gerar SVG das sheets");
  }
}
