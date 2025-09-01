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
import { productSchema, type ProductInput } from "./schema/products-schema";

// Criação de produto
export async function appendProductService(data: ProductInput) {
    try {
        const parsed = productSchema.safeParse(data);
        if (!parsed.success) {
            throw errorsResponse(400, "Dados do produto inválidos", parsed.error.format());
        }

        const product_id = await generateId("P");

        const insertedEntity = await insertEntityToTable(parsed.data, {
            tableName: "table_products",
            idObject: product_id,
            idColumnName: "product_id",
            selectFields: "*, product_category(*)"
        });

        return successResponse(insertedEntity, 201, "Produto criado com sucesso");
    } catch (err: any) {
        throw errorsResponse(err.status || 500, err.message || "Erro interno", err.details);
    }
}

// Listagem de produtos
export async function getProductService() {
    try {
        const data = await getEntitiesService({
            tableName: "table_products",
            idColumnName: "product_id",
            selectFields: "*, product_category(*)"
        });

        return successResponse(data, 200, "Produtos encontrados");
    } catch (err: any) {
        throw errorsResponse(err.status || 500, err.message || "Erro interno", err.details);
    }
}

// Buscar produto por ID
export async function getProductByIdService(product_id: string) {
    try {
        const data = await getEntityByIdService({
            tableName: "table_products",
            idColumnName: "product_id",
            idObject: product_id,
            selectFields: "*, product_category(*)"
        });

        return successResponse(data, 200, "Produto encontrado");
    } catch (err: any) {
        throw errorsResponse(err.status || 500, err.message || "Erro interno", err.details);
    }
}

// Atualização de produto
export async function updateProductService(product_id: string, data: ProductInput) {
    try {
        const parsed = productSchema.partial().safeParse(data);
        if (!parsed.success) {
            throw errorsResponse(400, "Dados do produto inválidos", parsed.error.format());
        }

        const updatedEntity = await updateEntityInTable(parsed.data, {
            tableName: "table_products",
            idObject: product_id,
            idColumnName: "product_id",
            selectFields: "*, product_category(*)"
        });

        return successResponse(updatedEntity, 200, "Produto atualizado com sucesso");
    } catch (err: any) {
        throw errorsResponse(err.status || 500, err.message || "Erro interno", err.details);
    }
}

// Exclusão de produto
export async function deleteProductService(product_id: string) {
    try {
        const deletedEntity = await deleteEntityService({
            tableName: "table_products",
            idObject: product_id,
            idColumnName: "product_id",
            selectFields: "*"
        });

        return successResponse(deletedEntity, 204, "Produto deletado com sucesso");
    } catch (err: any) {
        throw errorsResponse(err.status || 500, err.message || "Erro interno", err.details);
    }
}
