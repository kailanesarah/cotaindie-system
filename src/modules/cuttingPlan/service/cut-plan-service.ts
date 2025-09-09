import { getPiecesByProjectId } from "@/modules/piece/piece-services";
import { packMaxRects, type Piece, type Sheet } from "../utils/packing-utils";
import { calculateWasteRate } from "../utils/waste-rate-utils";

type CleanSheet = {
  width: number;
  height: number;
  used: {
    name: string;
    width: number;
    height: number;
    x: number;
    y: number;
    rotated: boolean;
  }[];
  freeSpace: {
    totalArea: number;
    usedArea: number;
    wasteRate: number;
  };
};

export async function generateSheetsForProject(
  project_id: string,
  sheetW: number,
  sheetH: number,
  allowRotate = false,
  margin = 0,
): Promise<{
  message: string;
  totalSheets: number;
  totalWasteRate: number;
  sheets: CleanSheet[];
}> {
  const response = await getPiecesByProjectId(project_id);

  if (
    !response?.data ||
    !Array.isArray(response.data) ||
    response.data.length === 0
  ) {
    throw new Error("Nenhuma peça encontrada para o projeto");
  }

  const pieces: Piece[] = response.data.map((item: any) => ({
    w: item.piece_width,
    h: item.piece_height,
    name: item.piece_name,
  }));

  const rawSheets: Sheet[] = packMaxRects(
    sheetW,
    sheetH,
    pieces,
    allowRotate,
    margin,
  );

  const sheets: CleanSheet[] = rawSheets.map((sheet) => {
    const usedArea = sheet.usedRects.reduce(
      (sum, rect) => sum + rect.w * rect.h,
      0,
    );
    const totalArea = sheetW * sheetH;
    const wasteRate = calculateWasteRate(sheetW, sheetH, sheet.usedRects);

    return {
      width: sheetW,
      height: sheetH,
      used: sheet.usedRects.map((rect) => ({
        name: rect.name ?? "Sem nome",
        width: rect.w,
        height: rect.h,
        x: rect.x,
        y: rect.y,
        rotated: rect.rotated ?? false,
      })),
      freeSpace: {
        totalArea,
        usedArea,
        wasteRate,
      },
    };
  });

  const totalAreaAllSheets = sheets.length * sheetW * sheetH;
  const totalUsedArea = sheets.reduce(
    (sum, sheet) => sum + sheet.freeSpace.usedArea,
    0,
  );
  const totalWasteRate = 1 - totalUsedArea / totalAreaAllSheets;

  return {
    message: "Chapas geradas com sucesso",
    totalSheets: sheets.length,
    totalWasteRate,
    sheets,
  };
}
