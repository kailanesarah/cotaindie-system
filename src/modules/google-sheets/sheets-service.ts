// src/domains/google-sheets/sheets.service.ts
import { getRangeSheet } from "@/modules/google-sheets/sheets-utils";
import { sheets } from "./sheets-client";
import type { Sheet } from "./sheets-schema";

export async function getSheetDataService({ sheetId, sheetRange }: Sheet) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: sheetRange,
    });

    return response.data.values ?? [];
  } catch (error) {
    console.error("Erro ao buscar dados da planilha:", error);

    throw error;
  }
}
export async function getSheetDatabyIdService({
  sheetId,
  sheetRange,
  sheetObjectId,
}: Sheet): Promise<{ rowIndex: number; rowData: any[] }> {
  try {
    if (!sheetObjectId) throw new Error("sheetObjectId é obrigatório.");

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: sheetRange,
    });

    const data = response.data.values ?? [];

    const rowIndex = data.findIndex((row) =>
      row.some((cell) => cell?.trim() === sheetObjectId.trim()),
    );

    if (rowIndex === -1)
      throw new Error(`objectId "${sheetObjectId}" não encontrado`);

    return { rowIndex, rowData: data[rowIndex] };
  } catch (error) {
    console.error("Erro ao buscar dados da planilha:", error);
    throw error;
  }
}

export async function appendSheetDataService({
  sheetId,
  sheetRange,
  sheetValues,
}: Sheet) {
  try {
    if (!sheetValues) throw new Error("sheetValues é obrigatório.");

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: sheetRange,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: sheetValues },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar dados na planilha:", error);
    throw error;
  }
}

export async function updateSheetDatabyIdService({
  sheetId,
  sheetRange,
  sheetObjectId,
  sheetValues,
}: Sheet) {
  try {
    if (!sheetObjectId) throw new Error("sheetObjectId é obrigatório.");
    if (!sheetValues) throw new Error("sheetValues é obrigatório.");

    const { rowIndex } = await getSheetDatabyIdService({
      sheetId,
      sheetRange,
      sheetObjectId,
    });

    if (rowIndex === -1) return;

    const updateRange = await getRangeSheet(sheetRange, rowIndex);

    const updateResponse = await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: updateRange,
      valueInputOption: "RAW",
      requestBody: { values: sheetValues },
    });

    return updateResponse.data;
  } catch (error) {
    console.error("Erro ao atualizar dados da planilha:", error);
    throw error;
  }
}

export async function deleteRowFromSheetService({
  sheetId,
  sheetName,
  sheetRange,
  sheetObjectId,
}: Sheet) {
  try {
    if (!sheetObjectId) throw new Error("sheetObjectId é obrigatório.");
    if (!sheetName) throw new Error("sheetName é obrigatório.");

    const { rowIndex } = await getSheetDatabyIdService({
      sheetId,
      sheetRange,
      sheetObjectId,
    });
    console.log("Linha do dado" + rowIndex);

    const metadata = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
    const sheet = metadata.data.sheets?.find(
      (s) => s.properties?.title === sheetName,
    );

    if (!sheet || sheet.properties?.sheetId === undefined)
      throw new Error(`Aba "${sheetName}" não encontrada.`);

    const numericSheetId = sheet.properties.sheetId;

    const response = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: numericSheetId,
                dimension: "ROWS",
                startIndex: rowIndex + 1,
                endIndex: rowIndex + 2,
              },
            },
          },
        ],
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao excluir linha:", error);
    throw error;
  }
}
