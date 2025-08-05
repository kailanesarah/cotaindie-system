"use server";

import {
  serviceDataGET,
  serviceDataAppend,
  serviceDataById,
  serviceDataUpdate,
  serviceDataDelete,
} from "@/modules/clients/services";
import { mapSheetDataToClients } from "@/modules/clients/utils";
import { ClientInput } from "@/modules/clients/schema";
import { revalidatePath } from "next/cache";

export async function getClientsAction() {
  const sheetData = await serviceDataGET();
  const clients = mapSheetDataToClients(sheetData);
  return clients;
}

export async function getClientByIdAction(clientId: string) {
  const sheetData = await serviceDataById(clientId);
  return sheetData;
}

export async function appendClientsAction(data: ClientInput) {
  const sheetData = await serviceDataAppend(data);

  revalidatePath("/clients");
}

export async function updateClientsAction(data: ClientInput) {
  const sheetData = await serviceDataUpdate(data);
  revalidatePath("/clients");
  return sheetData;
}

export async function deleteClientsAction(data: ClientInput) {
  const sheetData = await serviceDataDelete(data);
  revalidatePath("/clients");
  return sheetData;
}
