import { Errors } from "@/utils/errors";
import { generateId } from "@/utils/idGenerator";
import {
  deleteEntityService,
  getEntitiesService,
  getEntityByIdService,
  insertEntityToTable,
  updateEntityInTable,
} from "../supabase/supabase-service";
import { categorySchema, type CategoryInput } from "./schema/categories-schema";

// Criação de categoria
export async function appendCategoryService(data: CategoryInput) {
  try {
    const parsed = categorySchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, ...Errors.INVALID_DATA(parsed.error.format()) };
    }

    const category_id = await generateId("CAT");
    const payload = { category_id, ...parsed.data };

    const response = await insertEntityToTable(payload, {
      tableName: "table_categories",
      idObject: category_id,
      idColumnName: "category_id",
      selectFields: "*",
    });

    return { ...response, success: true };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Listagem de categorias
export async function getCategoryService() {
  try {
    const response = await getEntitiesService({
      tableName: "table_categories",
      idColumnName: "category_id",
      selectFields: "*",
    });

    return { ...response, success: true };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Buscar categoria por ID
export async function getCategoryByIdService(category_id: string) {
  if (!category_id)
    return { success: false, ...Errors.MISSING_PARAM("category_id") };

  try {
    const response = await getEntityByIdService({
      tableName: "table_categories",
      idColumnName: "category_id",
      idObject: category_id,
      selectFields: "*",
    });

    if (!response) return { success: false, ...Errors.NOT_FOUND("categoria") };

    return { ...response, success: true };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Atualização de categoria
export async function updateCategoryService(
  category_id: string,
  data: CategoryInput,
) {
  if (!category_id)
    return { success: false, ...Errors.MISSING_PARAM("category_id") };

  try {
    const parsed = categorySchema.partial().safeParse(data);
    if (!parsed.success) {
      return { success: false, ...Errors.INVALID_DATA(parsed.error.format()) };
    }

    const response = await updateEntityInTable(parsed.data, {
      tableName: "table_categories",
      idObject: category_id,
      idColumnName: "category_id",
      selectFields: "*",
    });

    return { ...response, success: true };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Exclusão de categoria
export async function deleteCategoryService(category_id: string) {
  if (!category_id)
    return { success: false, ...Errors.MISSING_PARAM("category_id") };

  try {
    const response = await deleteEntityService({
      tableName: "table_categories",
      idObject: category_id,
      idColumnName: "category_id",
      selectFields: "*",
    });

    return { ...response, success: true };
  } catch (err: any) {
    const isForeignKey = err.message?.includes("foreign key");
    return {
      success: false,
      ...(isForeignKey
        ? Errors.FOREIGN_KEY_VIOLATION("categoria")
        : Errors.INTERNAL(err.message)),
    };
  }
}
