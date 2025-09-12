// ----------------------------
// Calcula desperdício de uma chapa
// ----------------------------
export function calculateWasteRate(
  sheetWidth: number,
  sheetHeight: number,
  usedRects: { w: number; h: number }[],
): number {
  try {
    const totalArea = sheetWidth * sheetHeight;
    const usedArea = usedRects.reduce((sum, rect) => sum + rect.w * rect.h, 0);
    return 1 - usedArea / totalArea;
  } catch (error) {
    console.error("Erro ao calcular desperdício da chapa:", error);
    throw new Error("Falha ao calcular desperdício da chapa");
  }
}

// ----------------------------
// Calcula métricas de uma sheet (genérico)
// ----------------------------
export function calculateSheetMetrics<
  T extends {
    w: number;
    h: number;
    usedRects: Array<{
      w: number;
      h: number;
      x: number;
      y: number;
      name?: string;
      rotated?: boolean;
      oversize?: boolean;
      margin?: number;
    }>;
  },
>(sheet: T, margin: number) {
  try {
    const used = sheet.usedRects.map((rect) => ({
      name: rect.name ?? "Sem nome",
      width: rect.w,
      height: rect.h,
      x: rect.x,
      y: rect.y,
      rotated: rect.rotated ?? false,
      oversize: rect.oversize ?? false,
      displayWidth: Math.min(rect.w, sheet.w),
      displayHeight: Math.min(rect.h, sheet.h),
      margin: rect.margin ?? margin,
    }));

    const usedArea = used.reduce(
      (sum, r) => sum + (r.width + 2 * r.margin) * (r.height + 2 * r.margin),
      0,
    );
    const totalArea = sheet.w * sheet.h;
    const wasteRate = ((totalArea - usedArea) / totalArea) * 100;

    return { used, totalArea, usedArea, wasteRate };
  } catch (error) {
    console.error("Erro ao calcular métricas da sheet:", error);
    throw new Error("Falha ao calcular métricas da sheet");
  }
}
