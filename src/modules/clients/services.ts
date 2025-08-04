import { GetClients, AppendClients, GetClientsById, updateClientbyId} from "./repository";
import { clientSchema, ClientInput } from "./schema";
import { generateCode, mapSheetDataToClients} from "./utils";
import {  } from './utils'; 

export async function serviceDataGET() {
  try {
    const data = await GetClients();
    return data;
  } catch (error) {
    console.error("Erro no serviceDataGET:", error);
    throw error;
  }
}


export async function serviceDataById(clientId: string) {
  try {
    const { rowIndex, rowData } = await GetClientsById(clientId);
    const [mappedClient] = mapSheetDataToClients([rowData]);

    return { ...mappedClient, rowIndex }; 
  } catch (error) {
    console.error("Erro no serviceDataById:", error);
    throw error;
  }
}

export async function serviceDataAppend(data: ClientInput) {
  try {
    const data_validation = clientSchema.safeParse(data);

    if (!data_validation.success) {
      console.error("Erro na validação dos dados:", data_validation.error.format());
      throw new Error("Dados inválidos");
    }

    const valid_client = data_validation.data;
    const code = generateCode()
    const id = `c-${code}`

    const values_client = Object.values(valid_client).map(value => value ?? "");
    const row: string[] = [id, ...values_client];

    await AppendClients([row]);
  } catch (error) {
    console.error("Erro ao adicionar cliente:", error);
    throw error; 
  }
}

export async function serviceDataUpdate(data: ClientInput) {
  try {
    const validation = clientSchema.safeParse(data);
    if (!validation.success) {
      console.error("Erro na validação dos dados:", validation.error.format());
      throw new Error("Dados inválidos");
    }

    const validClient = validation.data;
    console.log("dados atualizados: " + validClient);
    const { rowIndex } = await GetClientsById(validClient.id!);

    if (typeof rowIndex !== "number" || rowIndex < 0) {
      throw new Error("Cliente não encontrado na planilha.");
    }

    const updatedValues = [Object.values(validClient).map(value => value ?? "")];

    await updateClientbyId(validClient.id!, updatedValues);

  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    throw error;
  }
}
