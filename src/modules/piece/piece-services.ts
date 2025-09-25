// piece-services.ts

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
import { pieceSchema, type pieceInput } from "./schemas/pieces-schemas";

// Criação de peças (múltiplas)
export async function appendPieceService(
  project_id: string,
  data: pieceInput[],
) {
  try {
    console.log("Criando peças para o projeto:", project_id);

    const insertedPieces = await Promise.all(
      data.map(async (piece, index) => {
        const parsed = pieceSchema.safeParse(piece);
        if (!parsed.success) {
          console.error(`Peça inválida [${index}]:`, parsed.error.format());
          throw errorsResponse(
            400,
            `Dados da peça inválidos no índice ${index}`,
            parsed.error.format(),
          );
        }

        const piece_id = await generateId("PIE");
        const dataWithProject = { ...parsed.data, project_id, piece_id };

        return insertEntityToTable(dataWithProject, {
          tableName: "table_pieces",
          idColumnName: "piece_id",
          selectFields:
            "*, project_id(project_id, project_name), product_id(product_id, product_name)",
        });
      }),
    );

    return successResponse(insertedPieces, 201, "Peças criadas com sucesso");
  } catch (err: any) {
    console.error("Erro ao criar peças:", err);
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}

// Listagem de peças
export async function getPiecesService() {
  try {
    const data = await getEntitiesService({
      tableName: "table_pieces",
      idColumnName: "piece_id",
      selectFields:
        "*, project_id(project_id, project_name), product_id(product_id, product_name, product_category)",
    });

    return successResponse(data, 200, "Peças encontradas");
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}

// Buscar peça por ID
export async function getPieceByIdService(piece_id: string) {
  try {
    const data = await getEntityByIdService({
      tableName: "table_pieces",
      idColumnName: "piece_id",
      idObject: piece_id,
      selectFields: "*, project_id(*)",
    });

    return successResponse(data, 200, "Peça encontrada");
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}

export async function getPiecesByProjectId(project_id: string) {
  try {
    const response = await getEntitiesService({
      tableName: "table_pieces",
      idColumnName: "piece_id", // precisa existir
      selectFields:
        "*, project_id(project_id, project_name), product_id(product_id, product_category)",
    });

    console.log("Resposta completa do service:", response);
    const filteredPieces = response.data.filter(
      (item: any) => item.project_id?.project_id === project_id,
    );

    console.log(
      `Peças filtradas para o projeto ${project_id}:`,
      filteredPieces,
    );

    return successResponse(filteredPieces, 200, "Peças do projeto encontradas");
  } catch (err: any) {
    console.error("Erro ao buscar peças por projeto:", err);
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}

// Atualização de peça
export async function updatePieceService(piece_id: string, data: pieceInput) {
  try {
    const parsed = pieceSchema.partial().safeParse(data);
    if (!parsed.success) {
      throw errorsResponse(
        400,
        "Dados da peça inválidos",
        parsed.error.format(),
      );
    }

    const updatedEntity = await updateEntityInTable(parsed.data, {
      tableName: "table_pieces",
      idObject: piece_id,
      idColumnName: "piece_id",
      selectFields:
        "*, project_id(project_id, project_name), product_id(product_id, product_name)",
    });

    return successResponse(updatedEntity, 200, "Peça atualizada com sucesso");
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}

// Exclusão de peça
export async function deletePieceService(piece_id: string) {
  try {
    const deletedEntity = await deleteEntityService({
      tableName: "table_pieces",
      idObject: piece_id,
      idColumnName: "piece_id",
      selectFields: "*, project_id(*), product_id(*)",
    });

    return successResponse(deletedEntity, 204, "Peça deletada com sucesso");
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}
