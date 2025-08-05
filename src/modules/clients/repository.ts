import {
  getSheetData,
  appendSheetData,
  getSheetDatabyId,
  updateSheetDatabyId,
  deleteRowFromSheet,
} from "@/lib/googleSheets";

export async function GetClients() {
  return await getSheetData(process.env.SHEET_ID!, "bd-clients!A2:M");
}

export async function GetClientsById(clientId: string) {
  return await getSheetDatabyId(
    process.env.SHEET_ID!,
    "bd-clients!A2:M",
    clientId
  );
}

export async function AppendClients(values: any[][]) {
  await appendSheetData(process.env.SHEET_ID!, "bd-clients!A2:M", values);
}

export async function updateClientbyId(clientId: string, values: any[][]) {
  await updateSheetDatabyId(
    process.env.SHEET_ID!,
    "bd-clients!A2:M",
    clientId,
    values
  );
}

export async function deleteClientRow(clientId: string) {
  await deleteRowFromSheet(
    process.env.SHEET_ID!,
    "bd-clients",
    clientId,
    "bd-clients!A2:M"
  );
}
