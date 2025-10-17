import type { DrawSheet, Piece } from "./schemas/sheet-types";
import { drawSheetsSVG } from "./utils/draw/draw-sheets-svg";
import { drawSingleSheetSVG } from "./utils/draw/draw-single-sheet-svg.ts";
import { saveSVGToFile } from "./utils/draw/save-svg-utils";
import { packMaxRects, type Sheet as RawSheet } from "./utils/packing-utils";
import { calculateWasteRate } from "./utils/waste-utils";

interface CleanSVG {
  id: string;
  svg: string;
  filePath: string;
  material: string;
}

interface MaterialSheetSummary {
  material: string;
  totalSheets: number; // gasto exato
  totalSheetsRounded: number; // arredondado
  individualSVGs: CleanSVG[];
  groupedSVG: CleanSVG;
}

export async function generateSheetsForProject(
  groupedPieces: Record<string, Piece[]>,
  sheetW: number,
  sheetH: number,
  defaultMargin = 30,
  allowRotateGlobal = false,
): Promise<{ materials: MaterialSheetSummary[] }> {
  const materialsResult: MaterialSheetSummary[] = [];
  let svgCounter = 1;

  for (const [material, pieces] of Object.entries(groupedPieces)) {
    if (!pieces || pieces.length === 0) continue;

    const itemsWithRotate = pieces.map((p) => ({
      ...p,
      allowRotate: allowRotateGlobal,
    }));

    // Empacotamento das chapas do material
    const rawSheets: RawSheet[] = packMaxRects(
      sheetW,
      sheetH,
      itemsWithRotate,
      defaultMargin,
    );

    const sheets: DrawSheet[] = rawSheets.map((sheet) => ({
      w: sheet.w,
      h: sheet.h,
      usedRects: sheet.usedRects.map((u) => ({
        x: u.x,
        y: u.y,
        w: u.w,
        h: u.h,
        name: u.name ?? "Sem nome",
        rotated: u.rotated ?? false,
        oversize: u.oversize ?? false,
        margin: u.margin ?? defaultMargin,
      })),
      freeRects: sheet.freeRects,
      material,
    }));

    // 🔹 Calcula desperdício individual por chapa
    const wastePerSheet = sheets.map((s) =>
      calculateWasteRate([s], defaultMargin, 0.15),
    );

    // 🔹 Total de chapas gastas (soma ponderada)
    const totalSheets = wastePerSheet.reduce(
      (sum, w) => sum + (1 - w / 100),
      0,
    );
    const totalSheetsRounded = Math.ceil(totalSheets);

    // 🔹 SVGs individuais
    const individualSVGs: CleanSVG[] = sheets.map((sheet, i) => {
      const svgId = `${svgCounter++}`;
      const svgData = drawSingleSheetSVG(
        sheet,
        0.4,
        defaultMargin,
        svgId,
        wastePerSheet[i],
      );
      const filePath = saveSVGToFile(svgData.svg, "./svg-output", svgId);
      return { id: svgId, svg: svgData.svg, filePath, material };
    });

    // 🔹 SVG agrupado
    const groupedSvgId = `${svgCounter++}`;
    const groupedSVGData = drawSheetsSVG(
      sheets,
      0.4,
      defaultMargin,
      groupedSvgId,
      wastePerSheet,
    );
    const groupedFilePath = saveSVGToFile(
      groupedSVGData.svg,
      "./svg-output",
      groupedSvgId,
    );

    const groupedSVG: CleanSVG = {
      id: groupedSvgId,
      svg: groupedSVGData.svg,
      filePath: groupedFilePath,
      material,
    };

    // 🔹 Adiciona resultado por material
    materialsResult.push({
      material,
      totalSheets: parseFloat(totalSheets.toFixed(2)),
      totalSheetsRounded,
      individualSVGs,
      groupedSVG,
    });
  }

  return { materials: materialsResult };
}
