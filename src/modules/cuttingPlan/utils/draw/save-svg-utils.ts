import fs from "fs";
import path from "path";

/**
 * Salva SVG em arquivo local e retorna caminho formatado
 * @param svgContent Conteúdo SVG
 * @param folder Pasta para salvar (ex: "./svg-output")
 * @param fileName Nome do arquivo sem extensão
 * @returns Caminho completo do arquivo com barras normais (/) para legibilidade
 */
export function saveSVGToFile(
  svgContent: string,
  folder: string,
  fileName: string,
): string {
  const fullFolder = path.resolve(folder);
  if (!fs.existsSync(fullFolder)) fs.mkdirSync(fullFolder, { recursive: true });

  const filePath = path.join(fullFolder, `${fileName}.svg`);
  fs.writeFileSync(filePath, svgContent, "utf-8");

  // Troca todas as barras invertidas por barras normais
  return filePath.replace(/\\/g, "/");
}
