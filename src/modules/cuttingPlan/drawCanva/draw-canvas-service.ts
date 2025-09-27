import fs from "fs";
import path from "path";

export type SheetForDrawing = {
  w: number;
  h: number;
  usedRects: {
    x: number;
    y: number;
    w: number;
    h: number;
    rotated: boolean;
    name: string;
    oversize?: boolean;
    margin?: number; // margem individual opcional
  }[];
  freeRects?: { x: number; y: number; w: number; h: number }[];
};

export function drawSheetsSVG(
  sheets: SheetForDrawing[],
  scale = 0.2,
  margin = 0,
): { svg: string; base64: string; filePath: string; url: string } {
  try {
    if (!sheets || sheets.length === 0)
      throw new Error("Nenhuma chapa para desenhar");

    let offsetX = 0;
    const spacing = 50;
    const legendHeight = 120;
    const wasteTextHeight = 30;

    const canvasW =
      sheets.reduce((sum, s) => sum + s.w * scale, 0) +
      spacing * (sheets.length - 1);
    const canvasH =
      Math.max(...sheets.map((s) => s.h * scale)) +
      legendHeight +
      wasteTextHeight +
      80;

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasW}" height="${canvasH}">`;

    sheets.forEach((sheet, i) => {
      const offsetY = 30;

      svgContent += `<rect x="${offsetX}" y="${offsetY}" width="${sheet.w * scale}" height="${sheet.h * scale}" fill="#f0f0f0" stroke="black" stroke-width="2"/>`;
      svgContent += `<text x="${offsetX}" y="${offsetY - 8}" font-family="Arial" font-size="16" font-weight="bold">Chapa ${i + 1} (${sheet.w}x${sheet.h} mm)</text>`;

      sheet.freeRects?.forEach((f) => {
        svgContent += `<rect x="${offsetX + f.x * scale}" y="${offsetY + f.y * scale}" width="${f.w * scale}" height="${f.h * scale}" fill="rgba(255,0,0,0.3)" stroke="none"/>`;
      });

      sheet.usedRects.forEach((rect) => {
        const x = offsetX + rect.x * scale;
        const y = offsetY + rect.y * scale;
        const w = rect.w * scale;
        const h = rect.h * scale;
        const marginLine = (rect.margin ?? margin) * scale;

        if (marginLine > 0) {
          svgContent += `<rect x="${x - marginLine}" y="${y - marginLine}" width="${w + 2 * marginLine}" height="${h + 2 * marginLine}" fill="rgba(0,255,0,0.2)" stroke="green" stroke-width="1" stroke-dasharray="4,2"/>`;
        }

        const fill = rect.oversize
          ? "rgba(255,100,232,0.68)"
          : "rgba(100,150,255,0.5)";
        const stroke = rect.oversize ? "red" : "black";

        svgContent += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="1"/>`;
        svgContent += `<text x="${x + 2}" y="${y + 16}" font-family="Arial" font-size="12" font-weight="bold">${rect.name}${rect.rotated ? " (rot)" : ""}${rect.oversize ? " ⚠" : ""}</text>`;
        svgContent += `<text x="${x + 2}" y="${y + 28}" font-family="Arial" font-size="12">(${rect.w}x${rect.h} mm)</text>`;
      });

      const totalArea = sheet.w * sheet.h;
      const usedArea = sheet.usedRects.reduce((sum, r) => {
        const m = r.margin ?? margin;
        return sum + (r.w + 2 * m) * (r.h + 2 * m);
      }, 0);
      const wasteRate = ((totalArea - usedArea) / totalArea) * 100;

      svgContent += `<text x="${offsetX}" y="${offsetY + sheet.h * scale + 30}" font-family="Arial" font-size="14" fill="red" font-weight="bold">Desperdício: ${wasteRate.toFixed(2)}%</text>`;

      offsetX += sheet.w * scale + spacing;
    });

    const legendX = 10;
    const legendStartY =
      Math.max(...sheets.map((s) => s.h * scale)) + wasteTextHeight + 60;
    const legendSpacingY = 32;
    const legendItems = [
      { color: "rgba(100,150,255,0.5)", text: "Peça normal" },
      { color: "rgba(0,255,0,0.2)", text: "Margem de segurança" },
      { color: "rgba(255,0,0,0.3)", text: "Área de desperdício" },
      { color: "rgba(255,100,232,0.68)", text: "Peça oversize" },
    ];

    legendItems.forEach((item, i) => {
      const y = legendStartY + i * legendSpacingY;
      svgContent += `<rect x="${legendX}" y="${y}" width="22" height="22" fill="${item.color}" stroke="black" stroke-width="1"/>`;
      svgContent += `<text x="${legendX + 35}" y="${y + 18}" font-family="Arial" font-size="16" font-weight="bold">${item.text}</text>`;
    });

    svgContent += `</svg>`;

    const base64 = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString("base64")}`;

    // Salva arquivo no projeto Next.js
    const folderPath = path.join(process.cwd(), "public/svg");
    if (!fs.existsSync(folderPath))
      fs.mkdirSync(folderPath, { recursive: true });

    const fileName = `sheet_${Date.now()}.svg`;
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, svgContent, "utf8");

    const url = `/svg/${fileName}`; // link público

    return { svg: svgContent, base64, filePath, url };
  } catch (error) {
    console.error("Erro ao gerar SVG das chapas:", error);
    throw new Error("Falha ao gerar SVG das chapas");
  }
}
