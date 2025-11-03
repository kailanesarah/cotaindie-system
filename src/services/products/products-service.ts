import { Errors } from "@/utils/errors";
import { generateId } from "@/utils/generate-nano-id";
import {
  deleteEntityService,
  getEntitiesService,
  getEntityByIdService,
  insertEntityToTable,
  updateEntityInTable,
} from "../../lib/supabase/supabase-service";
import { productSchema, type ProductInput } from "./schema/products-schema";

// Criação de produto
export async function appendProductService(data: ProductInput) {
  try {
    const parsed = productSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, ...Errors.INVALID_DATA(parsed.error.format()) };
    }

    const product_id = await generateId("P");
    const payload = { product_id, ...parsed.data };

    const response = await insertEntityToTable(payload, {
      tableName: "table_products",
      idObject: product_id,
      idColumnName: "product_id",
      selectFields: "*, product_category(*)",
    });

    return { ...response };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.details) };
  }
}

// Listagem de produtos
export async function getProductService() {
  try {
    const response = await getEntitiesService({
      tableName: "table_products",
      idColumnName: "product_id",
      selectFields: "*, product_category(*)",
    });

    return { ...response };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.details) };
  }
}

// Buscar produto por ID
export async function getProductByIdService(product_id: string) {
  if (!product_id)
    return { success: false, ...Errors.MISSING_PARAM("product_id") };

  try {
    const response = await getEntityByIdService({
      tableName: "table_products",
      idColumnName: "product_id",
      idObject: product_id,
      selectFields: "*, product_category(*)",
    });

    if (!response) return { success: false, ...Errors.NOT_FOUND("produto") };

    return { ...response };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.details) };
  }
}

// Atualização de produto
export async function updateProductService(
  product_id: string,
  data: ProductInput,
) {
  if (!product_id)
    return { success: false, ...Errors.MISSING_PARAM("product_id") };

  try {
    const parsed = productSchema.partial().safeParse(data);
    if (!parsed.success) {
      return { success: false, ...Errors.INVALID_DATA(parsed.error.format()) };
    }

    const response = await updateEntityInTable(parsed.data, {
      tableName: "table_products",
      idObject: product_id,
      idColumnName: "product_id",
      selectFields: "*, product_category(*)",
    });

    return { ...response };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.details) };
  }
}

// Exclusão de produto
export async function deleteProductService(product_id: string) {
  if (!product_id)
    return { success: false, ...Errors.MISSING_PARAM("product_id") };

  try {
    const response = await deleteEntityService({
      tableName: "table_products",
      idObject: product_id,
      idColumnName: "product_id",
      selectFields: "*",
    });

    return { ...response };
  } catch (err: any) {
    const isForeignKey = err.message?.includes("foreign key");
    return {
      success: false,
      ...(isForeignKey
        ? Errors.FOREIGN_KEY_VIOLATION("produto")
        : Errors.INTERNAL(err.details)),
    };
  }
}
