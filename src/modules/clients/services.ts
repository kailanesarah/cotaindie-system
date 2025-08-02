import { GetClients, AppendClients } from "./repository";
import { clientSchema, ClientInput } from "./schema";
import { v4 as uuidv4 } from 'uuid';
import { generateCode } from "./utils";

export async function serviceDataGET() {
  try {
    const data = await GetClients();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Erro no serviceDataGET:", error);
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