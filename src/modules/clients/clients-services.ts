import {
  getClientsRepository,
  appendClientsRepository,
  getClientsByIdRepository,
  updateClientbyIdRepository,
  deleteClientRowRepository,
} from "./clients-repository";
import { clientSchema, ClientInput } from "./clients-schema";
import { mapSheetDataToClients } from "./clients-utils";
import { nanoid } from "nanoid";

export async function dataGETService() {
  try {
    const data = await getClientsRepository();
    return data;
  } catch (error) {
    console.error("Erro no serviceDataGET:", error);
    throw error;
  }
}

export async function dataByIdService(clientId: string) {
  try {
    const { rowIndex, rowData } = await getClientsByIdRepository(clientId);
    const [mappedClient] = mapSheetDataToClients([rowData]);

    return { ...mappedClient, rowIndex };
  } catch (error) {
    console.error("Erro no serviceDataById:", error);
    throw error;
  }
}

export async function dataAppendService(data: ClientInput) {
  try {
    const data_validation = clientSchema.safeParse(data);

    if (!data_validation.success) {
      console.error(
        "Erro na validação dos dados:",
        data_validation.error.format()
      );
      throw new Error("Dados inválidos");
    }

    const valid_client = data_validation.data;
    const id = `C-${nanoid(8)}`;

    const row: string[] = [
      id,
      valid_client.name ?? "",
      valid_client.category ?? "",
      valid_client.cpf ?? "",
      valid_client.cnpj ?? "",
      valid_client.phone ?? "",
      valid_client.email ?? "",
      valid_client.city ?? "",
      valid_client.zipCode ?? "",
      valid_client.neighborhood ?? "",
      valid_client.address ?? "",
      valid_client.complement ?? "",
      valid_client.notes ?? "",
    ];

    await appendClientsRepository([row]);
  } catch (error) {
    console.error("Erro ao adicionar cliente:", error);
    throw error;
  }
}

export async function dataUpdateService(data: ClientInput) {
  try {
    const validation = clientSchema.safeParse(data);

    if (!validation.success) {
      console.error("Erro na validação dos dados:", validation.error.format());
      throw new Error("Dados inválidos");
    }

    const validClient = validation.data;
    const { rowIndex } = await getClientsByIdRepository(validClient.id!);

    if (typeof rowIndex !== "number" || rowIndex < 0) {
      throw new Error("Cliente não encontrado na planilha.");
    }

    const updatedValues = [
      Object.values(validClient).map((value) => value ?? ""),
    ];

    await updateClientbyIdRepository(validClient.id!, updatedValues);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    throw error;
  }
}

export async function dataDeleteService(data: ClientInput) {
  try {
    const validation = clientSchema.safeParse(data);

    if (!validation.success) {
      console.error("Erro na validação dos dados:", validation.error.format());
      throw new Error("Dados inválidos");
    }

    const validClient = validation.data;

    const { rowIndex } = await getClientsByIdRepository(validClient.id!);

    if (typeof rowIndex !== "number" || rowIndex < 0) {
      throw new Error("Cliente não encontrado na planilha.");
    }

    await deleteClientRowRepository(validClient.id!);
    console.log(`Cliente com ID ${validClient.id} excluído com sucesso.`);
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    throw error;
  }
}
