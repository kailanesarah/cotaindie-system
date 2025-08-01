import { google, sheets_v4 } from "googleapis";
import { JWT } from "google-auth-library";

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

/**
 * Adiciona (append) dados na planilha
 * @param values Array de arrays com os dados (linhas)
 */
export async function appendSheetData(
  sheetId: string,
  range: string,
  values: any[][]
) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range,
      valueInputOption: "RAW", // ou USER_ENTERED
      insertDataOption: "INSERT_ROWS",
      requestBody: { values },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar dados na planilha:", error);
    throw error;
  }
}
