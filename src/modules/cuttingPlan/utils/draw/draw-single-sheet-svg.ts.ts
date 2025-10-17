import type { DrawSheet, MaterialSVG } from "../../schemas/sheet-types";
import { drawUsedRectsSVG } from "./sheet-svg-utils";

export function drawSingleSheetSVG(
  sheet: DrawSheet,
  scale = 0.2,
  margin = 0,
  fileNameBase?: string,
  wasteRate?: number,
): MaterialSVG {
  const canvasW = sheet.w * scale + 40;
  const canvasH = sheet.h * scale + 80;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasW}" height="${canvasH}">`;
  svg += `<rect x="20" y="20" width="${sheet.w * scale}" height="${
    sheet.h * scale
  }" fill="rgba(255,100,100,0.2)" stroke="black" stroke-width="2"/>`;
  svg += `<text x="20" y="15" font-family="Arial" font-size="14" font-weight="bold">Chapa (${sheet.w}x${sheet.h})</text>`;

  // 🔹 Desenha as peças e legendas
  svg += drawUsedRectsSVG(sheet, 20, 20, scale, margin, wasteRate);

  svg += `</svg>`;

  const fileName = `${fileNameBase ?? "sheet"}_${Date.now()}.svg`;
  return {
    svg,
    url: `/svg/${fileName}`,
    scaledSheets: [sheet],
    material: sheet.material,
  };
}
