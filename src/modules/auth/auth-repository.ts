import { getSheetDataService } from "@/modules/google-sheets/sheets-service";
import type { Sheet } from "../google-sheets/sheets-schema";

const BASE_SHEET: Omit<Sheet, "sheetObjectId" | "sheetValues"> = {
  sheetId: process.env.SHEET_ID!,
  sheetRange: "bd-users!A2:D",
  sheetName: "bd-users",
};
export async function usersFromSheetRepository() {
  return await getSheetDataService({
    ...BASE_SHEET,
  });
}
