import { fetchPieces } from "@/modules/piece/utils/utils";
import { generateSheetsSVG } from "../drawCanva/draw-canvas-utils";
import type { CleanSheet } from "../schemas/schema";
import { packMaxRects, type Sheet } from "../utils/packing-utils";
import { calculateSheetMetrics } from "../utils/waste-rate-utils";

export async function generateSheetsForProject(
  project_id: string,
  sheetW: number,
  sheetH: number,
  defaultMargin = 30,
): Promise<{
  message: string;
  totalSheets: number;
  totalWasteRate: number;
  sheets: CleanSheet[];
  imageUrl: string;
}> {
  const pieces = await fetchPieces(project_id);

  const rawSheets: Sheet[] = packMaxRects(
    sheetW,
    sheetH,
    pieces,
    defaultMargin,
  );

  const { imageUrl } = generateSheetsSVG(rawSheets, defaultMargin);

  const sheets: CleanSheet[] = rawSheets.map((sheet) => {
    const { used, totalArea, usedArea, wasteRate } = calculateSheetMetrics(
      sheet,
      defaultMargin,
    );
    return {
      width: sheet.w,
      height: sheet.h,
      used,
      freeSpace: { totalArea, usedArea, wasteRate },
    };
  });

  const totalAreaAllSheets = sheets.reduce(
    (sum, s) => sum + s.width * s.height,
    0,
  );
  const totalUsedArea = sheets.reduce(
    (sum, s) => sum + s.freeSpace.usedArea,
    0,
  );
  const totalWasteRate =
    ((totalAreaAllSheets - totalUsedArea) / totalAreaAllSheets) * 100;

  return {
    message: "Chapas geradas com sucesso",
    totalSheets: sheets.length,
    totalWasteRate,
    sheets,
    imageUrl,
  };
}
