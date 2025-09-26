import { errorsResponse } from "@/utils/errors-messages";
import { generateId } from "@/utils/idGenerator";
import { successResponse } from "@/utils/success-messages";
import {
    deleteEntityService,
    getEntitiesService,
    getEntityByIdService,
    insertEntityToTable,
    updateEntityInTable
} from "../supabase/supabase-service";
import { clientSchema, type ClientInput } from "./schema/clients-schema";

// Criação de cliente
export async function appendClientService(data: ClientInput) {
    try {
        const parsed = clientSchema.safeParse(data);
        if (!parsed.success) {
            throw errorsResponse(400, "Dados do cliente inválidos", parsed.error.format());
        }

        const client_id = await generateId("C");

        const insertedEntity = await insertEntityToTable(parsed.data, {
            tableName: "table_clients",
            idObject: client_id,
            idColumnName: "client_id",
            selectFields: "*"
        });

        return successResponse(insertedEntity, 201, "Cliente criado com sucesso");
    } catch (err: any) {
        throw errorsResponse(err.status || 500, err.message || "Erro interno", err.details);
    }
}

// Listagem de clientes
export async function getClientService() {
    try {
        const data = await getEntitiesService({
            tableName: "table_clients",
            idColumnName: "client_id",
            selectFields: "*"
        });

        return successResponse(data, 200, "Clientes encontrados");
    } catch (err: any) {
        throw errorsResponse(err.status || 500, err.message || "Erro interno", err.details);
    }
}

// Buscar cliente por ID
export async function getClientByIdService(client_id: string) {
    try {
        const data = await getEntityByIdService({
            tableName: "table_clients",
            idColumnName: "client_id",
            idObject: client_id,
            selectFields: "*"
        });

        return successResponse(data, 200, "Cliente encontrado");
    } catch (err: any) {
        throw errorsResponse(err.status || 500, err.message || "Erro interno", err.details);
    }
}

// Atualização de cliente
export async function updateClientService(client_id: string, data: ClientInput) {
    try {
        const parsed = clientSchema.partial().safeParse(data);
        if (!parsed.success) {
            throw errorsResponse(400, "Dados do cliente inválidos", parsed.error.format());
        }

        const updatedEntity = await updateEntityInTable(parsed.data, {
            tableName: "table_clients",
            idObject: client_id,
            idColumnName: "client_id",
            selectFields: "*"
        });

        return successResponse(updatedEntity, 200, "Cliente atualizado com sucesso");
    } catch (err: any) {
        throw errorsResponse(err.status || 500, err.message || "Erro interno", err.details);
    }
}

// Exclusão de cliente
export async function deleteClientService(client_id: string) {
    try {
        const deletedEntity = await deleteEntityService({
            tableName: "table_clients",
            idObject: client_id,
            idColumnName: "client_id",
            selectFields: "*"
        });

        return successResponse(deletedEntity, 204, "Cliente deletado com sucesso");
    } catch (err: any) {
        throw errorsResponse(err.status || 500, err.message || "Erro interno", err.details);
    }
}
