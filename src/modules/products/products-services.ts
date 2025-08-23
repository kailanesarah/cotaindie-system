import {
    appendDataService,
    deleteDataRowService,
    getDataByIdService,
    getDataService,
    updateDatabyIdService
} from "../google-sheets/sheets-service";

import { errorsResponse } from "@/utils/errors-messages";
import { generateId } from "@/utils/idGenerator";
import { objectToSheetRow } from "@/utils/sheets-mapper";
import { successResponse } from "@/utils/success-messages";
import { productSchema, type ProductInput } from "./products-schema";


const BASE_SHEET = {
    sheetId: process.env.SHEET_ID!,
    sheetRange: "bd-products!A2:M",
    sheetName: "bd-products",
};

export async function getProductService() {
    try {
        const data = await getDataService(productSchema, BASE_SHEET);
        return successResponse(data, 200);
    } catch (error: any) {
        throw errorsResponse(500, "Erro ao buscar clientes", error);
    }
}

export async function getProductByIdService(clientId: string) {
    try {
        const rowData = await getDataByIdService(productSchema, clientId, BASE_SHEET);

        if (!rowData) {
            throw errorsResponse(404, "Cliente não encontrado");
        }

        return successResponse(rowData, 200);
    } catch (error: any) {
        throw errorsResponse(500, "Erro ao buscar cliente por ID", error);
    }
}


export async function appendProductService(data: ProductInput) {
    try {
        const parsed = productSchema.safeParse(data);
        if (!parsed.success) {
            throw errorsResponse(400, "Dados inválidos", parsed.error.format());
        }

        const validClient = parsed.data;
        const product_id = await generateId("P");

        const row = objectToSheetRow({ product_id, ...validClient }, productSchema);


        await appendDataService([row], BASE_SHEET);
        return successResponse({ product_id, ...validClient }, 201);
    } catch (error: any) {
        console.error("Erro ao adicionar produto:", error);
        throw errorsResponse(500, "Erro interno ao adicionar produto", error);
    }
}


export async function updateProductService(data: ProductInput) {
    try {

        const parsed = productSchema.safeParse(data);
        if (!parsed.success) {
            throw errorsResponse(400, "Dados inválidos", parsed.error);
        }

        const validProduct = parsed.data;

        if (!validProduct.product_id) {
            throw errorsResponse(400, "ID do produto ausente");
        }

        const updatedValues = objectToSheetRow(validProduct, productSchema);
        await updateDatabyIdService(validProduct.product_id, [updatedValues], BASE_SHEET);

        return successResponse(validProduct, 200);
    } catch (error: any) {
        console.error("Erro ao atualizar produto:", error);
        throw errorsResponse(500, "Erro interno ao atualizar produto", error);
    }
}

export async function deleteProductService(product_id: string) {
  try {
    if (!product_id || typeof product_id !== "string" || !product_id.trim()) {
      throw errorsResponse(400, "ID do produto ausente ou inválido");
    }

    await deleteDataRowService(product_id, BASE_SHEET);

    console.log(`Produto com ID ${product_id} excluído com sucesso.`);

    return successResponse(
      { message: `Produto com ID ${product_id} excluído com sucesso.` },
      200
    );
  } catch (error: any) {
    console.error("Erro ao deletar produto:", error);
    throw errorsResponse(500, "Erro interno ao deletar produto", error);
  }
}
