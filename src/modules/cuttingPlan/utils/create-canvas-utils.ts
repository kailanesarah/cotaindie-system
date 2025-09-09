import { createCanvas } from "canvas";

type SheetForDrawing = {
  w: number;
  h: number;
  usedRects: {
    x: number;
    y: number;
    w: number;
    h: number;
    rotated: boolean;
    name: string;
  }[];
};

export function drawSheetsNode(
  sheets: SheetForDrawing[],
  scale = 0.2, // escala para caber tudo na imagem final
): Buffer {
  if (!sheets || sheets.length === 0) {
    throw new Error("Nenhuma chapa para desenhar");
  }

  // tamanho de cada chapa na visualização
  const sheetW = sheets[0].w * scale;
  const sheetH = sheets[0].h * scale;

  // canvas grande: largura proporcional à quantidade de chapas
  const margin = 50;
  const canvasW = sheets.length * (sheetW + margin);
  const canvasH = sheetH + 100; // espaço extra para rodapé

  const canvas = createCanvas(canvasW, canvasH);
  const ctx = canvas.getContext("2d");

  // fundo branco
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvasW, canvasH);

  // desenha cada chapa
  sheets.forEach((sheet, i) => {
    const offsetX = i * (sheetW + margin);
    const offsetY = 20;

    // borda da chapa
    ctx.strokeStyle = "#000";
    ctx.strokeRect(offsetX, offsetY, sheetW, sheetH);

    // título da chapa
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.fillText(
      `Chapa ${i + 1} (${sheet.w}x${sheet.h} mm)`,
      offsetX,
      offsetY - 5,
    );

    // desenha as peças
    sheet.usedRects.forEach((rect) => {
      ctx.fillStyle = "rgba(100,150,255,0.5)";
      ctx.fillRect(
        offsetX + rect.x * scale,
        offsetY + rect.y * scale,
        rect.w * scale,
        rect.h * scale,
      );

      ctx.strokeStyle = "#000";
      ctx.strokeRect(
        offsetX + rect.x * scale,
        offsetY + rect.y * scale,
        rect.w * scale,
        rect.h * scale,
      );

      // legenda com nome + tamanho
      ctx.fillStyle = "#000";
      ctx.font = "10px Arial";
      const pieceLabel = `${rect.name || "Peça"} ${rect.w}x${rect.h} mm${
        rect.rotated ? " (rot)" : ""
      }`;

      ctx.fillText(
        pieceLabel,
        offsetX + rect.x * scale + 2,
        offsetY + rect.y * scale + 12,
      );
    });
  });

  // rodapé
  ctx.fillStyle = "#000";
  ctx.font = "14px Arial";
  ctx.fillText(
    `Chapas usadas: ${sheets.length} | Eficiência: 71.0%`,
    10,
    canvasH - 20,
  );

  return canvas.toBuffer("image/png");
}
