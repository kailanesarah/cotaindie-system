export function objetoParaTabela(
  obj: Record<string, string | number | undefined>,
  maxColunas = 2,
): string[][] {
  const pares = Object.entries(obj).filter(([, value]) => value !== undefined);
  const result: string[][] = [];
  for (let i = 0; i < pares.length; i += maxColunas) {
    const linha = pares
      .slice(i, i + maxColunas)
      .map(([chave, valor]) => `${chave}: ${valor}`);
    result.push(linha);
  }
  return result;
}
