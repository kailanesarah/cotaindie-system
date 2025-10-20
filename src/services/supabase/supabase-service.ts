import { Errors } from "@/utils/errors";
import {
  type EntitiesByIdsOptions,
  type EntityOptionsInput,
} from "./schema/services_schema";
import { supabaseServer } from "./server";

export async function getSupabaseUser() {
  const supabase = await supabaseServer();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const data = user;
  return { data, error };
}

export async function insertEntityToTable<T>(
  data: T,
  options: EntityOptionsInput,
) {
  try {
    const supabase = await supabaseServer();
    const { data: user } = await getSupabaseUser();

    const insertPayload = {
      [options.idColumnName]: options.idObject,
      user_id: user?.id,
      ...data,
    };

    const { data: insertedEntity, error } = await supabase
      .from(options.tableName)
      .insert([insertPayload])
      .select(options.selectFields || "*")
      .single();

    if (error || !insertedEntity) {
      return { success: false, ...Errors.INTERNAL(error?.message) };
    }

    return {
      success: true,
      status: 201,
      message: `Registro criado com sucesso na tabela ${options.tableName}`,
      data: insertedEntity,
    };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

export async function getEntitiesService(options: EntityOptionsInput) {
  try {
    const supabase = await supabaseServer();
    const { data: user } = await getSupabaseUser();

    const { data, error } = await supabase
      .from(options.tableName)
      .select(options.selectFields || "*")
      .eq("user_id", user?.id);

    if (error) return { success: false, ...Errors.INTERNAL(error.message) };

    return {
      success: true,
      status: 200,
      message: `Registros encontrados na tabela ${options.tableName}`,
      data,
    };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

export async function getEntityByIdService(options: EntityOptionsInput) {
  try {
    const supabase = await supabaseServer();
    const { data: user } = await getSupabaseUser();

    const { data, error } = await supabase
      .from(options.tableName)
      .select(options.selectFields || "*")
      .eq(options.idColumnName, options.idObject)
      .eq("user_id", user?.id)
      .single();

    if (error || !data)
      return { success: false, ...Errors.NOT_FOUND("registro") };

    return {
      success: true,
      status: 200,
      message: `Registro encontrado na tabela ${options.tableName}`,
      data,
    };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

export async function getEntitiesByIdsService(options: EntitiesByIdsOptions) {
  try {
    const supabase = await supabaseServer();
    const { data: user } = await getSupabaseUser();

    const { data, error } = await supabase
      .from(options.tableName)
      .select(options.selectFields || "*")
      .in(options.idColumnName, options.ids)
      .eq("user_id", user?.id);

    if (error || !data || data.length === 0)
      return { success: false, ...Errors.NOT_FOUND("registros") };

    return { success: true, data };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

export async function updateEntityInTable<T>(
  data: T,
  options: EntityOptionsInput,
) {
  try {
    const supabase = await supabaseServer();
    const { data: user } = await getSupabaseUser();

    const { data: updatedEntity, error } = await supabase
      .from(options.tableName)
      .update(data)
      .eq(options.idColumnName, options.idObject)
      .eq("user_id", user?.id)
      .select(options.selectFields || "*")
      .single();

    if (error || !updatedEntity)
      return { success: false, ...Errors.INTERNAL(error?.message) };

    return {
      success: true,
      status: 200,
      message: `Registro atualizado com sucesso na tabela ${options.tableName}`,
      data: updatedEntity,
    };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

export async function deleteEntityService(options: EntityOptionsInput) {
  try {
    const supabase = await supabaseServer();
    const { data: user } = await getSupabaseUser();

    const { data: deleted, error } = await supabase
      .from(options.tableName)
      .delete()
      .eq(options.idColumnName, options.idObject)
      .eq("user_id", user?.id)
      .select()
      .single();

    if (error || !deleted)
      return { success: false, ...Errors.INTERNAL(error?.message) };

    return {
      success: true,
      status: 204,
      message: `Registro deletado com sucesso na tabela ${options.tableName}`,
      data: deleted,
    };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}
