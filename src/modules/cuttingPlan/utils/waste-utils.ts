import { type DrawSheet } from "../schemas/sheet-types";

/**
 * Calcula a taxa de desperdício de uma ou mais chapas
 * Considera um limite mínimo de desperdício por chapa: se a sobra da chapa
 * for menor ou igual ao threshold, a chapa é considerada 100% utilizada.
 *
 * @param sheets Array de chapas
 * @param margin Margem extra para cálculo de área usada
 * @param threshold Limite de sobra aceitável (0-1), default 0.15 = 15%
 * @returns Desperdício em porcentagem (0-100)
 */
export function calculateWasteRate(
  sheets: DrawSheet[],
  margin = 0,
  threshold = 0.15,
): number {
  if (!sheets || sheets.length === 0) return 0;

  const adjustedUsages = sheets.map((sheet) => {
    const sheetArea = sheet.w * sheet.h;
    const usedArea = sheet.usedRects.reduce((sum, r) => {
      const m = r.margin ?? margin;
      return sum + (r.w + 2 * m) * (r.h + 2 * m);
    }, 0);

    let usageRate = usedArea / sheetArea;

    // Se sobra <= threshold, considera 100% utilizada
    if (1 - usageRate <= threshold) usageRate = 1;

    return usageRate;
  });

  // Média simples das chapas
  const averageUsage =
    adjustedUsages.reduce((sum, u) => sum + u, 0) / sheets.length;

  return (1 - averageUsage) * 100;
}

/**
 * Versão com threshold em percentual (0-100) e cálculo ponderado por área
 *
 * @param sheets Array de chapas
 * @param margin Margem extra para cálculo de área usada
 * @param thresholdPercent Limite de sobra aceitável por chapa (0-100)
 * @returns Desperdício em porcentagem (0-100)
 */
export function calculateWasteRateRounded(
  sheets: DrawSheet[],
  margin = 0,
  thresholdPercent = 15,
): number {
  if (!sheets || sheets.length === 0) return 0;

  let totalUsed = 0;
  let totalArea = 0;

  sheets.forEach((sheet) => {
    const sheetArea = sheet.w * sheet.h;
    totalArea += sheetArea;

    const usedArea = sheet.usedRects.reduce((sum, r) => {
      const m = r.margin ?? margin;
      return sum + (r.w + 2 * m) * (r.h + 2 * m);
    }, 0);

    const remaining = sheetArea - usedArea;

    // se sobra <= threshold, considera chapa totalmente usada
    totalUsed +=
      remaining <= (sheetArea * thresholdPercent) / 100 ? sheetArea : usedArea;
  });

  return ((totalArea - totalUsed) / totalArea) * 100;
}
