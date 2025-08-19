import {
    appendSheetDataService,
    deleteRowFromSheetService,
    getSheetDatabyIdService,
    getSheetDataService,
    updateSheetDatabyIdService,
} from "@/modules/google-sheets/sheets-service";
import type { Sheet } from "../google-sheets/sheets-schema";


export async function getDataRepository(
    sheet: Omit<Sheet, "sheetObjectId" | "sheetValues">) {
    return await getSheetDataService(sheet);
}

export async function getDataByIdRepository(
    objectId: string, 
    sheet: Omit<Sheet, "sheetObjectId" | "sheetValues">) {
    return await getSheetDatabyIdService({
        ...sheet,
        sheetObjectId: objectId,
    });
}

export async function appendDataRepository(
    values: string[][], 
    sheet: Omit<Sheet, "sheetObjectId" | "sheetValues">) {
    await appendSheetDataService({
        ...sheet,
        sheetValues: values,
    });
}

export async function updateDatabyIdRepository(
    objectId: string,
    values: string[][],
    sheet: Omit<Sheet, "sheetObjectId" | "sheetValues">
) {
    await updateSheetDatabyIdService({
        ...sheet,
        sheetObjectId: objectId,
        sheetValues: values,
    });
}

export async function deleteDataRowRepository(
    objectId: string, 
    sheet: Omit<Sheet, "sheetObjectId" | "sheetValues">) {
    await deleteRowFromSheetService({
        ...sheet,
        sheetObjectId: objectId,
    });
}
