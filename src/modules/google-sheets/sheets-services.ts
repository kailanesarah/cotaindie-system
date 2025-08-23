import {
  appendSheetDataRepository,
  deleteRowFromSheetRepository,
  getSheetDatabyIdRepository,
  getSheetDataRepository,
  updateSheetDatabyIdRepository,
} from "@/modules/google-sheets/sheets-repository";
import { mapSheetDataWithSchema } from "@/utils/sheets-mapper";
import type { ZodType } from "zod";
import type { Sheet } from "./sheets-schema";


export async function getDataService<T>(
  schema: ZodType<T>,
  sheet: Omit<Sheet, "sheetObjectId" | "sheetValues">
): Promise<T[]> {
  const rawData = await getSheetDataRepository(sheet);
  return mapSheetDataWithSchema(rawData, schema);
}

export async function getDataByIdService<T>(
  schema: ZodType<T>,
  objectId: string,
  sheet: Omit<Sheet, "sheetObjectId" | "sheetValues">
): Promise<T> {
  const { rowData } = await getSheetDatabyIdRepository({
    ...sheet,
    sheetObjectId: objectId,
  });

  const [mappedRow] = mapSheetDataWithSchema([rowData], schema);
  return mappedRow;
}

export async function appendDataService(
    values: string[][], 
    sheet: Omit<Sheet, "sheetObjectId" | "sheetValues">) {
    await appendSheetDataRepository({
        ...sheet,
        sheetValues: values,
    });
}

export async function updateDatabyIdService(
    objectId: string,
    values: string[][],
    sheet: Omit<Sheet, "sheetObjectId" | "sheetValues">
) {
    await updateSheetDatabyIdRepository({
        ...sheet,
        sheetObjectId: objectId,
        sheetValues: values,
    });
}

export async function deleteDataRowService(
    objectId: string, 
    sheet: Omit<Sheet, "sheetObjectId" | "sheetValues">) {
    await deleteRowFromSheetRepository({
        ...sheet,
        sheetObjectId: objectId,
    });
}
