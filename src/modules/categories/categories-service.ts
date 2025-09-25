import { errorsResponse } from "@/utils/errors-messages";
import { generateId } from "@/utils/idGenerator";
import { successResponse } from "@/utils/success-messages";
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
      throw errorsResponse(
        400,
        "Dados da categoria inválidos",
        parsed.error.format(),
      );
    }

    const category_id = await generateId("CAT");
    const payload = { category_id, ...parsed.data };

    console.log("Inserindo categoria:", payload);

    const insertedEntity = await insertEntityToTable(payload, {
      tableName: "table_categories",
      idColumnName: "category_id",
      selectFields: "*",
    });

    return successResponse(insertedEntity, 201, "Categoria criada com sucesso");
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}

// Listagem de categorias
export async function getCategoryService() {
  try {
    const data = await getEntitiesService({
      tableName: "table_categories",
      idColumnName: "category_id",
      selectFields: "*",
    });

    return successResponse(data, 200, "Categorias encontradas");
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}
export async function getCategoryByIdService(category_id: string) {
  const categoryData = await getEntityByIdService({
    tableName: "table_categories",
    idColumnName: "category_id",
    idObject: category_id,
    selectFields: "*",
  });

  if (!categoryData) {
    throw errorsResponse(404, "Categoria não encontrada");
  }

  return {
    statusCode: 200,
    message: "Categoria encontrada",
    data: categoryData,
  };
}

// Atualização de categoria
export async function updateCategoryService(
  category_id: string,
  data: CategoryInput,
) {
  try {
    const parsed = categorySchema.partial().safeParse(data);
    if (!parsed.success) {
      throw errorsResponse(
        400,
        "Dados da categoria inválidos",
        parsed.error.format(),
      );
    }

    const updatedEntity = await updateEntityInTable(parsed.data, {
      tableName: "table_categories",
      idObject: category_id,
      idColumnName: "category_id",
      selectFields: "*",
    });

    return successResponse(
      updatedEntity,
      200,
      "Categoria atualizada com sucesso",
    );
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}

// Exclusão de categoria
export async function deleteCategoryService(category_id: string) {
  try {
    const deletedEntity = await deleteEntityService({
      tableName: "table_categories",
      idObject: category_id,
      idColumnName: "category_id",
      selectFields: "*",
    });

    return successResponse(
      deletedEntity,
      200,
      "Categoria deletada com sucesso",
    );
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}
