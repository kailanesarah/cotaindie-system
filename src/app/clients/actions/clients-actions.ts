"use server";

import {
  dataGETService,
  dataAppendService,
  dataByIdService,
  dataUpdateService,
  dataDeleteService,
} from "@/modules/clients/clients-services";
import { mapSheetDataToClients } from "@/modules/clients/clients-utils";
import { ClientInput } from "@/modules/clients/clients-schema";
import { revalidatePath } from "next/cache";

export async function getClientsAction() {
  const sheetData = await dataGETService();
  const clients = mapSheetDataToClients(sheetData);
  return clients;
}

export async function getClientByIdAction(clientId: string) {
  const sheetData = await dataByIdService(clientId);
  return sheetData;
}

export async function appendClientsAction(data: ClientInput) {
  const sheetData = await dataAppendService(data);

  revalidatePath("/clients");
}

export async function updateClientsAction(data: ClientInput) {
  const sheetData = await dataUpdateService(data);
  revalidatePath("/clients");
  return sheetData;
}

export async function deleteClientsAction(data: ClientInput) {
  const sheetData = await dataDeleteService(data);
  revalidatePath("/clients");
  return sheetData;
}
