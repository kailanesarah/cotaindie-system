import { google, sheets_v4 } from "googleapis";
import { JWT } from "google-auth-library";
import { getRangeSheet } from "@/utils/utils";

const auth: JWT = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets: sheets_v4.Sheets = google.sheets({ version: "v4", auth });

export async function getSheetData(sheetId: string, range: string) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });
    return response.data.values ?? [];
  } catch (error) {
    console.error("Erro ao buscar dados da planilha:", error);
    throw error;
  }
}

export async function getSheetDatabyId(
  sheetId: string,
  range: string,
  objectId: string
): Promise<{ rowIndex: number; rowData: any[] }> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });

    const data = response.data.values ?? [];

    const rowIndex = data.findIndex((row) =>
      row.some((cell) => cell?.trim() === objectId.trim())
    );

    if (rowIndex === -1) {
      throw new Error(`objectId "${objectId}" não encontrado`);
    }

    return {
      rowIndex,
      rowData: data[rowIndex],
    };
  } catch (error) {
    console.error("Erro ao buscar dados da planilha:", error);
    throw error;
  }
}

export async function appendSheetData(
  sheetId: string,
  range: string,
  values: any[][]
) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar dados na planilha:", error);
    throw error;
  }
}

export async function updateSheetDatabyId(
  sheetId: string,
  range: string,
  objectId: string,
  values: any[][]
) {
  try {
    const { rowIndex } = await getSheetDatabyId(sheetId, range, objectId);

    if (rowIndex === -1 || typeof rowIndex !== "number") {
      console.log("Linha não encontrada na tabela");
      return;
    }
    const updateRange = await getRangeSheet(range, rowIndex);

    const updateResponse = await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: updateRange,
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    return updateResponse.data;
  } catch (error) {
    console.error("Erro ao atualizar dados da planilha:", error);
    throw error;
  }
}

export async function deleteRowFromSheet(
  sheetId: string,
  sheetName: string,
  objectId: string,
  range: string
) {
  try {
    const { rowIndex } = await getSheetDatabyId(sheetId, range, objectId);

    if (rowIndex === -1 || typeof rowIndex !== "number") {
      console.log("Linha não encontrada.");
      return;
    }

    if (rowIndex === 0) {
      throw new Error(
        "Tentativa de deletar o cabeçalho da planilha. Operação abortada."
      );
      return;
    }

    const metadata = await sheets.spreadsheets.get({
      spreadsheetId: sheetId,
    });

    const sheet = metadata.data.sheets?.find(
      (s) => s.properties?.title === sheetName
    );

    if (!sheet || sheet.properties?.sheetId === undefined) {
      throw new Error(`Aba "${sheetName}" não encontrada.`);
    }

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
                startIndex: rowIndex,
                endIndex: rowIndex + 1,
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
