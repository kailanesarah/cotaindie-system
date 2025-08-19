import { nanoid } from "nanoid";
import {
  appendDataRepository,
  deleteDataRowRepository,
  getDataByIdRepository,
  getDataRepository,
  updateDatabyIdRepository,
} from "../google-sheets/sheets-repository";

import { errorsResponse } from "@/utils/errors-messages";
import { successResponse } from "@/utils/success-messages";
import { type ClientInput, clientSchema } from "./clients-schema";
import { mapSheetDataToClients } from "./clients-utils";

const BASE_SHEET = {
  sheetId: process.env.SHEET_ID!,
  sheetRange: "bd-clients!A2:M",
  sheetName: "bd-clients",
};

export async function getClientService() {
  try {
    const data = await getDataRepository(BASE_SHEET);
    return successResponse(data, 200);
  } catch (error: any) {
    throw errorsResponse(500, "Erro ao buscar clientes", error);
  }
}

export async function getClientByIdService(clientId: string) {
  try {
    const { rowIndex, rowData } = await getDataByIdRepository(
      clientId,
      BASE_SHEET
    );

    if (rowIndex < 0) {
      throw errorsResponse(404, "Cliente não encontrado");
    }

    const [mappedClient] = mapSheetDataToClients([rowData]);
    const data = { ...mappedClient, rowIndex };
    return successResponse(data, 200);
  } catch (error: any) {
    throw errorsResponse(500, "Erro ao buscar cliente por ID", error);
  }
}

export async function appendClientService(data: ClientInput) {
  const parsed = clientSchema.safeParse(data);
  if (!parsed.success) {
    throw errorsResponse(400, "Dados inválidos", parsed.error.format());
  }

  const validClient = parsed.data;
  const client_id = `C-${nanoid(8)}`;

  const row: string[] = [
    client_id,
    validClient.client_name ?? "",
    validClient.client_category ?? "",
    validClient.client_cpf ?? "",
    validClient.client_cnpj ?? "",
    validClient.client_phone ?? "",
    validClient.client_email ?? "",
    validClient.client_city ?? "",
    validClient.client_zipCode ?? "",
    validClient.client_neighborhood ?? "",
    validClient.client_address ?? "",
    validClient.client_complement ?? "",
    validClient.client_notes ?? "",
  ];

  try {
    await appendDataRepository([row], BASE_SHEET);
    return successResponse({ client_id, ...validClient }, 201);
  } catch (error: any) {
    console.error("Erro ao adicionar cliente:", error);
    throw errorsResponse(500, "Erro interno ao adicionar cliente", error);
  }
}

export async function updateClientService(data: ClientInput) {
  const parsed = clientSchema.safeParse(data);
  if (!parsed.success) {
    throw errorsResponse(400, "Dados inválidos", parsed.error.format());
  }

  const validClient = parsed.data;
  const { rowIndex } = await getDataByIdRepository(
    validClient.client_id!,
    BASE_SHEET
  );

  if (rowIndex < 0) {
    throw errorsResponse(404, "Cliente não encontrado");
  }

  const updatedValues = [Object.values(validClient).map((v) => v ?? "")];

  try {
    await updateDatabyIdRepository(
      validClient.client_id!,
      updatedValues,
      BASE_SHEET
    );
    return successResponse(validClient, 200);
  } catch (error: any) {
    console.error("Erro ao atualizar cliente:", error);
    throw errorsResponse(500, "Erro interno ao atualizar cliente", error);
  }
}

export async function deleteClientService(client_id: string) {
  try {
    const { rowData } = await getDataByIdRepository(client_id, BASE_SHEET);
    const [mappedClient] = mapSheetDataToClients([rowData]);

    const parsed = clientSchema.safeParse(mappedClient);
    if (!parsed.success) {
      throw errorsResponse(400, "Dados inválidos", parsed.error.format());
    }

    const validClient = parsed.data;

    await deleteDataRowRepository(validClient.client_id!, BASE_SHEET);
    console.log(
      `Cliente com ID ${validClient.client_id} excluído com sucesso.`
    );

    return successResponse(
      { message: `Cliente com ID ${validClient.client_id} excluído com sucesso.` },
      200
    );
  } catch (error: any) {
    console.error("Erro ao deletar cliente:", error);
    throw errorsResponse(500, "Erro interno ao deletar cliente", error);
  }
}
