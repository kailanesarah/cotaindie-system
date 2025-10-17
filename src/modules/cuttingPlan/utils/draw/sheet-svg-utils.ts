import type { DrawSheet } from "../../schemas/sheet-types";
import { escapeXML } from "./escape-xml";

/**
 * Desenha retângulos usados de uma chapa com:
 * - Nome centralizado
 * - Indicação de rotação (R)
 * - Largura no topo (horizontal) com linha tracejada
 * - Altura na lateral (vertical) com linha tracejada
 * - Ajustado para dentro da peça
 */
export function drawUsedRectsSVG(
  sheet: DrawSheet,
  offsetX: number,
  offsetY: number,
  scale: number,
  margin = 0,
  wasteRate?: number,
): string {
  let content = "";

  sheet.usedRects.forEach((r) => {
    const m = r.margin ?? margin;
    const rw = r.rotated ? r.h : r.w;
    const rh = r.rotated ? r.w : r.h;

    const x = offsetX + r.x * scale;
    const y = offsetY + r.y * scale;
    const sw = rw * scale;
    const sh = rh * scale;
    const marginScaled = m * scale;

    // 🔹 Margem de segurança
    if (m > 0) {
      content += `<rect 
        x="${x - marginScaled}" 
        y="${y - marginScaled}" 
        width="${sw + 2 * marginScaled}" 
        height="${sh + 2 * marginScaled}" 
        fill="rgba(0,255,0,0.2)" 
        stroke="green" 
        stroke-width="1" 
        stroke-dasharray="4,2"
      />`;
    }

    // 🔹 Cor e borda
    const fill = r.oversize
      ? "rgba(255,100,232,0.68)"
      : "rgba(100,150,255,0.5)";
    const stroke = r.oversize ? "red" : "black";

    // 🔹 Tooltip com info completa
    const tooltip = `${escapeXML(r.name)} (${r.w}x${r.h}cm)${
      r.rotated ? " [Rotacionada]" : ""
    }`;

    // 🔹 Peça principal
    content += `<rect 
      x="${x}" 
      y="${y}" 
      width="${sw}" 
      height="${sh}" 
      fill="${fill}" 
      stroke="${stroke}" 
      stroke-width="1">
        <title>${tooltip}</title>
    </rect>`;

    // 🔹 Nome centralizado, com tag (R) se rotacionada
    const label = r.rotated ? `${r.name} (R)` : r.name;
    const nameX = x + sw / 2;
    const nameY = y + sh / 2;

    content += `<text 
      x="${nameX}" 
      y="${nameY}" 
      font-family="Arial" 
      font-size="10" 
      font-weight="bold" 
      text-anchor="middle" 
      dominant-baseline="middle">
        ${escapeXML(label)}
    </text>`;

    // 🔹 Largura horizontal (topo)
    const widthTextX = x + sw / 2;
    const widthTextY = y + 10;
    content += `<text 
      x="${widthTextX}" 
      y="${widthTextY}" 
      font-family="Arial" 
      font-size="8" 
      text-anchor="middle" 
      fill="black">
        ${rw}cm
    </text>
    <line 
      x1="${x + sw / 2}" 
      y1="${y}" 
      x2="${widthTextX}" 
      y2="${widthTextY - 2}" 
      stroke="black" 
      stroke-width="0.5" 
      stroke-dasharray="2,2"
    />`;

    // 🔹 Altura vertical (lateral)
    const heightTextX = x + sw - 8;
    const heightTextY = y + sh / 2;

    content += `<text 
      x="${heightTextX}" 
      y="${heightTextY}" 
      font-family="Arial" 
      font-size="8" 
      text-anchor="middle" 
      dominant-baseline="middle" 
      transform="rotate(-90, ${heightTextX}, ${heightTextY})" 
      fill="black">
        ${rh}cm
    </text>
    <line 
      x1="${x + sw}" 
      y1="${y + sh / 2}" 
      x2="${heightTextX + 2}" 
      y2="${heightTextY}" 
      stroke="black" 
      stroke-width="0.5" 
      stroke-dasharray="2,2"
    />`;
  });

  // 🔹 Legenda de desperdício
  if (wasteRate !== undefined) {
    const totalH = sheet.h * scale;
    content += `<text 
      x="${offsetX}" 
      y="${offsetY + totalH + 16}" 
      font-family="Arial" 
      font-size="12" 
      fill="red" 
      font-weight="bold">
        Desperdício: ${wasteRate.toFixed(2)}%
    </text>`;
  }

  return content;
}
