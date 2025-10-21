import { Errors } from "@/utils/errors";
import { generateId } from "@/utils/generate-nano-id";
import {
  deleteEntityService,
  getEntitiesService,
  getEntityByIdService,
  insertEntityToTable,
  updateEntityInTable,
} from "../../lib/supabase/supabase-service";
import { clientSchema, type ClientInput } from "./schema/clients-schema";

// Criação de cliente
export async function appendClientService(data: ClientInput) {
  try {
    const parsed = clientSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, ...Errors.INVALID_DATA(parsed.error.format()) };
    }

    const client_id = await generateId("C");
    const payload = { client_id, ...parsed.data };

    const response = await insertEntityToTable(payload, {
      tableName: "table_clients",
      idObject: client_id,
      idColumnName: "client_id",
      selectFields: "*",
    });

    return { ...response, success: true };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Listagem de clientes
export async function getClientService() {
  try {
    const response = await getEntitiesService({
      tableName: "table_clients",
      idColumnName: "client_id",
      selectFields: "*",
    });

    return { ...response, success: true };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Buscar cliente por ID
export async function getClientByIdService(client_id: string) {
  if (!client_id)
    return { success: false, ...Errors.MISSING_PARAM("client_id") };

  try {
    const response = await getEntityByIdService({
      tableName: "table_clients",
      idColumnName: "client_id",
      idObject: client_id,
      selectFields: "*",
    });

    if (!response) return { success: false, ...Errors.NOT_FOUND("cliente") };

    return { ...response, success: true };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Atualização de cliente
export async function updateClientService(
  client_id: string,
  data: ClientInput,
) {
  if (!client_id)
    return { success: false, ...Errors.MISSING_PARAM("client_id") };

  try {
    const parsed = clientSchema.partial().safeParse(data);
    if (!parsed.success) {
      return { success: false, ...Errors.INVALID_DATA(parsed.error.format()) };
    }

    const response = await updateEntityInTable(parsed.data, {
      tableName: "table_clients",
      idObject: client_id,
      idColumnName: "client_id",
      selectFields: "*",
    });

    return { ...response, success: true };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Exclusão de cliente
export async function deleteClientService(client_id: string) {
  if (!client_id)
    return { success: false, ...Errors.MISSING_PARAM("client_id") };

  try {
    const response = await deleteEntityService({
      tableName: "table_clients",
      idObject: client_id,
      idColumnName: "client_id",
      selectFields: "*",
    });

    return { ...response, success: true };
  } catch (err: any) {
    const isForeignKey = err.message?.includes("foreign key");
    return {
      success: false,
      ...(isForeignKey
        ? Errors.FOREIGN_KEY_VIOLATION("cliente")
        : Errors.INTERNAL(err.message)),
    };
  }
}
