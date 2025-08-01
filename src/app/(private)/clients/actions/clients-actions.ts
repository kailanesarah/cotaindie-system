"use server"

import { serviceDataGET, serviceDataAppend} from "@/modules/clients/services"
import { mapSheetDataToClients } from "@/modules/clients/utils";
import { ClientInput } from "@/modules/clients/schema";
import { revalidatePath } from "next/cache";

export async function getClientsAction() {
  const sheetData = await serviceDataGET();
  const clients = mapSheetDataToClients(sheetData);
  return clients;
}

export async function appendClientsAction(data: ClientInput) {
  const sheetData = await serviceDataAppend(data);
  revalidatePath("/clients");
}
