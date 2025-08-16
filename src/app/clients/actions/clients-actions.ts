"use server";

import { ROUTES } from "@/constants/urls";
import type { ClientInput } from "@/modules/clients/clients-schema";
import {
  dataAppendService,
  dataByIdService,
  dataDeleteService,
  dataGETService,
  dataUpdateService,
} from "@/modules/clients/clients-services";
import { mapSheetDataToClients } from "@/modules/clients/clients-utils";
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
  revalidatePath(ROUTES.PRIVATE.CLIENTS);
}

export async function updateClientsAction(data: ClientInput) {
  const sheetData = await dataUpdateService(data);
  revalidatePath(ROUTES.PRIVATE.CLIENTS);
  return sheetData;
}

export async function deleteClientsAction(data: ClientInput) {
  const sheetData = await dataDeleteService(data);
  revalidatePath(ROUTES.PRIVATE.CLIENTS);
  return sheetData;
}
