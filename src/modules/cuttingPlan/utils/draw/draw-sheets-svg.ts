import type { DrawSheet, MaterialSVG } from "../../schemas/sheet-types";
import { drawUsedRectsSVG } from "./sheet-svg-utils";

export function drawSheetsSVG(
  sheets: DrawSheet[],
  scale = 0.2,
  margin = 0,
  fileNameBase?: string,
  wasteRates?: number[],
): MaterialSVG {
  const spacing = 60;
  const legendHeight = 100;
  const titleHeight = 30;

  const totalW =
    sheets.reduce((sum, s) => sum + s.w * scale, 0) +
    spacing * (sheets.length - 1);
  const totalH =
    Math.max(...sheets.map((s) => s.h * scale)) +
    legendHeight +
    titleHeight +
    40;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}" style="background:white;">`;

  let offsetX = 0;
  const offsetY = titleHeight;

  sheets.forEach((sheet, i) => {
    svg += `<rect x="${offsetX}" y="${offsetY}" width="${sheet.w * scale}" height="${
      sheet.h * scale
    }" fill="rgba(255,100,100,0.2)" stroke="black" stroke-width="2"/>`;
    svg += `<text x="${offsetX}" y="${
      offsetY - 8
    }" font-family="Arial" font-size="14" font-weight="bold">Chapa ${i + 1}</text>`;

    // 🔹 Desenha as peças e legendas laterais
    svg += drawUsedRectsSVG(
      sheet,
      offsetX,
      offsetY,
      scale,
      margin,
      wasteRates?.[i],
    );

    offsetX += sheet.w * scale + spacing;
  });

  // Legenda global
  const legendX = 10;
  const legendY =
    Math.max(...sheets.map((s) => s.h * scale)) + titleHeight + 40;

  const legend = [
    { color: "rgba(255,100,100,0.2)", label: "Desperdício" },
    { color: "rgba(100,150,255,0.5)", label: "Peça normal" },
    { color: "rgba(255,100,232,0.68)", label: "Peça oversize" },
    { color: "rgba(0,255,0,0.2)", label: "Margem de segurança" },
  ];

  legend.forEach((item, i) => {
    const y = legendY + i * 20;
    svg += `<rect x="${legendX}" y="${y}" width="15" height="15" fill="${item.color}" stroke="black" stroke-width="1"/>`;
    svg += `<text x="${legendX + 22}" y="${
      y + 12
    }" font-family="Arial" font-size="12">${item.label}</text>`;
  });

  svg += `</svg>`;

  const fileName = `${fileNameBase ?? "grouped_sheets"}_${Date.now()}.svg`;
  return {
    svg,
    url: `/svg/${fileName}`,
    scaledSheets: sheets,
    material: sheets[0]?.material,
  };
}
