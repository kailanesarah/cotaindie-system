import sharp from "sharp";

export async function svgToBase64Png(svg: string): Promise<string> {
  try {
    const buffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return `data:image/png;base64,${buffer.toString("base64")}`;
  } catch (err) {
    console.error("Erro ao converter SVG para PNG base64:", err);
    throw new Error("Falha na conversão de imagem");
  }
}
