import type { ZodType } from "zod";

/**
 * Converte dados de planilha (array de arrays) em objetos validados pelo schema
 * @param data - Array de arrays, onde cada sub-array representa uma linha da planilha
 * @param schema - Schema Zod para validação dos dados
 * @returns Array de objetos do tipo T
 */
export function mapSheetDataWithSchema<T>(
  data: any[][],
  schema: ZodType<T>
): T[] {

  const keys = Object.keys((schema as any).shape) as (keyof T)[];

  return data.map((row) => {
    const obj = {} as T;
    keys.forEach((key, i) => {
      obj[key] = row[i] ?? "";
    });

    const parsed = schema.safeParse(obj);
    return parsed.success ? parsed.data : obj;
  });
}

/**
 * Converte um objeto validado por schema em array de strings
 * na ordem das chaves definidas no schema
 * @param obj - Objeto a ser convertido
 * @param schema - Schema Zod que define a ordem dos campos
 * @returns Array de strings representando uma linha da planilha
 */
export function objectToSheetRow<T>(obj: T, schema: ZodType<T>): string[] {
  const keys = Object.keys((schema as any).shape) as (keyof T)[];
  return keys.map((key) => (obj[key] ?? "").toString());
}
