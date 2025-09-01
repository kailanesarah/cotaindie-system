import { errorsResponse } from "@/utils/errors-messages";
import { successResponse } from "@/utils/success-messages";
import { type EntityOptionsInput } from "./schema/services_schema";
import { getAuthenticatedUser } from "./supabase-auth-service";
import { createClient } from "./supabase-server";

export async function insertEntityToTable<T>(
    data: T,
    options: EntityOptionsInput
) {
    try {
        const supabase = await createClient();
        const user = await getAuthenticatedUser(supabase);

        const insertPayload = {
            [options.idColumnName]: options.idObject,
            user_id: user.id,
            ...data,
        };

        const { data: insertedEntity, error } = await supabase
            .from(options.tableName)
            .insert([insertPayload])
            .select(options.selectFields || "*")
            .single();

        if (error || !insertedEntity) {
            throw errorsResponse(
                500,
                `Erro ao inserir na tabela ${options.tableName}`,
                error?.message
            );
        }

        return successResponse(
            insertedEntity,
            201,
            `Registro criado com sucesso na tabela ${options.tableName}`
        );
    } catch (err: any) {
        throw errorsResponse(
            err.status || 500,
            err.message || "Erro interno",
            err.details
        );
    }
}

export async function getEntitiesService(options: EntityOptionsInput) {
    try {
        const supabase = await createClient();
        const user = await getAuthenticatedUser(supabase);

        const { data, error } = await supabase
            .from(options.tableName)
            .select(options.selectFields || "*")
            .eq("user_id", user.id);

        if (error) {
            throw errorsResponse(500, `Erro ao buscar registros`, error.message);
        }

        return successResponse(
            data,
            200,
            `Registros encontrados na tabela ${options.tableName}`
        );
    } catch (err: any) {
        throw errorsResponse(
            err.status || 500,
            err.message || "Erro interno",
            err.details
        );
    }
}

export async function getEntityByIdService(options: EntityOptionsInput) {
    try {
        const supabase = await createClient();
        const user = await getAuthenticatedUser(supabase);

        const { data, error } = await supabase
            .from(options.tableName)
            .select(options.selectFields || "*")
            .eq(options.idColumnName, options.idObject)
            .eq("user_id", user.id)
            .single();

        if (error || !data) {
            throw errorsResponse(404, "Registro não encontrado", error?.message);
        }

        return successResponse(
            data,
            200,
            `Registro encontrado na tabela ${options.tableName}`
        );
    } catch (err: any) {
        throw errorsResponse(
            err.status || 500,
            err.message || "Erro interno",
            err.details
        );
    }
}

export async function updateEntityInTable<T>(
    data: T,
    options: EntityOptionsInput
) {
    try {
        const supabase = await createClient();
        const user = await getAuthenticatedUser(supabase);

        const { data: updatedEntity, error } = await supabase
            .from(options.tableName)
            .update(data)
            .eq(options.idColumnName, options.idObject)
            .eq("user_id", user.id)
            .select(options.selectFields || "*")
            .single();

        if (error || !updatedEntity) {
            throw errorsResponse(
                500,
                `Erro ao atualizar na tabela ${options.tableName}`,
                error.message
            );
        }

        return successResponse(
            updatedEntity,
            200,
            `Registro atualizado com sucesso na tabela ${options.tableName}`
        );
    } catch (err: any) {
        throw errorsResponse(
            err.status || 500,
            err.message || "Erro interno",
            err.details
        );
    }
}

export async function deleteEntityService(options: EntityOptionsInput) {
    try {
        const supabase = await createClient();
        const user = await getAuthenticatedUser(supabase);

        const { data: deleted, error } = await supabase
            .from(options.tableName)
            .delete()
            .eq(options.idColumnName, options.idObject)
            .eq("user_id", user.id)
            .select()
            .single();

        if (error || !deleted) {
            throw errorsResponse(500, "Erro ao deletar registro", error?.message);
        }

        return successResponse(
            deleted,
            204,
            `Registro deletado com sucesso na tabela ${options.tableName}`
        );
    } catch (err: any) {
        throw errorsResponse(
            err.status || 500,
            err.message || "Erro interno",
            err.details
        );
    }
}
