import { getSheetDataService, appendSheetDataService, getSheetDatabyIdService, updateSheetDatabyIdService, deleteRowFromSheetService} from "@/modules/google-sheets/sheets-service";
import { Sheet } from "../google-sheets/sheets-schema";

const BASE_SHEET: Omit<Sheet, "sheetObjectId" | "sheetValues"> = {
  sheetId: process.env.SHEET_ID!,
  sheetRange: "bd-clients!A2:M",
  sheetName: "bd-clients",
};

export async function getClientsRepository() {
  return await getSheetDataService(BASE_SHEET);
}

export async function getClientsByIdRepository(clientId: string) {
  return await getSheetDatabyIdService({
    ...BASE_SHEET,
    sheetObjectId: clientId,
  });
}

export async function appendClientsRepository(values: string[][]) {
  await appendSheetDataService({
    ...BASE_SHEET,
    sheetValues: values,
  });
}

export async function updateClientbyIdRepository(clientId: string, values: string[][]) {
  await updateSheetDatabyIdService({
    ...BASE_SHEET,
    sheetObjectId: clientId,
    sheetValues: values,
  });
}

export async function deleteClientRowRepository(clientId: string) {
  await deleteRowFromSheetService({
    ...BASE_SHEET,
    sheetObjectId: clientId,
  });
}
