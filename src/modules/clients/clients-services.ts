import {
  appendDataService,
  deleteDataRowService,
  getDataByIdService,
  getDataService,
  updateDatabyIdService,
} from "../google-sheets/sheets-services";

import { errorsResponse } from "@/utils/errors-messages";
import { generateId } from "@/utils/idGenerator";
import { objectToSheetRow } from "@/utils/sheets-mapper";
import { successResponse } from "@/utils/success-messages";
import { type ClientInput, clientSchema } from "./clients-schema";

const BASE_SHEET = {
  sheetId: process.env.SHEET_ID!,
  sheetRange: "bd-clients!A2:M",
  sheetName: "bd-clients",
};

export async function getClientService() {
  try {
    const data = await getDataService(clientSchema, BASE_SHEET);
    return successResponse(data, 200);
  } catch (error: any) {
    throw errorsResponse(500, "Erro ao buscar clientes", error);
  }
}

export async function getClientByIdService(clientId: string) {
  try {
    const rowData = await getDataByIdService(clientSchema, clientId, BASE_SHEET);

    if (!rowData) {
      throw errorsResponse(404, "Cliente não encontrado");
    }

    return successResponse(rowData, 200);
  } catch (error: any) {
    throw errorsResponse(500, "Erro ao buscar cliente por ID", error);
  }
}

export async function appendClientService(data: ClientInput) {
  try {
    const parsed = clientSchema.safeParse(data);
    if (!parsed.success) {
      throw errorsResponse(400, "Dados inválidos", parsed.error.format());
    }

    const validClient = parsed.data;
    const client_id = await generateId("C");

    const row = objectToSheetRow({ client_id, ...validClient }, clientSchema);


    await appendDataService([row], BASE_SHEET);
    return successResponse({ client_id, ...validClient }, 201);
  } catch (error: any) {
    console.error("Erro ao adicionar cliente:", error);
    throw errorsResponse(500, "Erro interno ao adicionar cliente", error);
  }
}

export async function updateClientService(data: ClientInput) {
  try {
    // Valida os dados de entrada
    const parsed = clientSchema.safeParse(data);
    if (!parsed.success) {
      throw errorsResponse(400, "Dados inválidos", parsed.error);
    }

    const validClient = parsed.data;


    // Atualiza diretamente a linha pelo ID
    const updatedValues = [Object.values(validClient).map((v) => v ?? "")];
    await updateDatabyIdService(validClient.client_id!, updatedValues, BASE_SHEET);

    return successResponse(validClient, 200);
  } catch (error: any) {
    console.error("Erro ao atualizar cliente:", error);
    throw errorsResponse(500, "Erro interno ao atualizar cliente", error);
  }
}

export async function deleteClientService(client_id: string) {
  try {
    if (!client_id || typeof client_id !== "string" || !client_id.trim()) {
      throw errorsResponse(400, "ID do cliente ausente ou inválido");
    }

    await deleteDataRowService(client_id, BASE_SHEET);

    console.log(`Cliente com ID ${client_id} excluído com sucesso.`);

    return successResponse(
      { message: `Cliente com ID ${client_id} excluído com sucesso.` },
      200
    );
  } catch (error: any) {
    console.error("Erro ao deletar cliente:", error);
    throw errorsResponse(500, "Erro interno ao deletar cliente", error);
  }
}
