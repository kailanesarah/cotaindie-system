import { Errors } from "@/utils/errors";
import { generateId } from "@/utils/idGenerator";
import {
  deleteEntityService,
  getEntitiesService,
  getEntityByIdService,
  insertEntityToTable,
  updateEntityInTable,
} from "../supabase/supabase-service";
import { pieceSchema, type pieceInput } from "./schemas/pieces-schemas";

// Listagem de peças
export async function getPiecesService() {
  try {
    const response = await getEntitiesService({
      tableName: "table_pieces",
      idColumnName: "piece_id",
      selectFields:
        "*, project_id(project_id, project_name), product_id(product_id, product_name, product_category)",
    });

    return { ...response };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Buscar peça por ID
export async function getPieceByIdService(piece_id: string) {
  if (!piece_id) return { success: false, ...Errors.MISSING_PARAM("piece_id") };

  try {
    const response = await getEntityByIdService({
      tableName: "table_pieces",
      idColumnName: "piece_id",
      idObject: piece_id,
      selectFields:
        "*, project_id(project_id, project_name), product_id(product_id, product_name)",
    });

    if (!response) return { success: false, ...Errors.NOT_FOUND("peça") };

    return { ...response };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Buscar peças por projeto
export async function getPiecesByProjectId(project_id: string) {
  if (!project_id)
    return { success: false, ...Errors.MISSING_PARAM("project_id") };

  try {
    const response = await getEntitiesService({
      tableName: "table_pieces",
      idColumnName: "piece_id",
      selectFields:
        "*, project_id(project_id, project_name), product_id(product_id, product_category)",
    });

    const filtered = response.data?.filter(
      (item: any) => item.project_id?.project_id === project_id,
    );

    return { success: true, data: filtered || [] };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Criar peças
export async function appendPieceService(
  project_id: string,
  data: pieceInput[],
) {
  if (!project_id)
    return { success: false, ...Errors.MISSING_PARAM("project_id") };

  try {
    const insertedPieces = await Promise.all(
      data.map(async (piece, index) => {
        const parsed = pieceSchema.safeParse(piece);
        if (!parsed.success) {
          throw new Error(
            `Dados da peça inválidos no índice ${index}: ${JSON.stringify(parsed.error.format())}`,
          );
        }

        const piece_id = await generateId("PIE");
        const dataWithProject = { ...parsed.data, project_id, piece_id };

        const response = await insertEntityToTable(dataWithProject, {
          tableName: "table_pieces",
          idColumnName: "piece_id",
          idObject: piece_id,
          selectFields:
            "*, project_id(project_id, project_name), product_id(product_id, product_name)",
        });

        return { ...response, success: true };
      }),
    );

    return { success: true, data: insertedPieces.map((p) => p.data) };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Atualização de peça
export async function updatePieceService(piece_id: string, data: pieceInput) {
  if (!piece_id) return { success: false, ...Errors.MISSING_PARAM("piece_id") };

  try {
    const parsed = pieceSchema.partial().safeParse(data);
    if (!parsed.success) {
      return { success: false, ...Errors.INVALID_DATA(parsed.error.format()) };
    }

    const response = await updateEntityInTable(parsed.data, {
      tableName: "table_pieces",
      idColumnName: "piece_id",
      idObject: piece_id,
      selectFields:
        "*, project_id(project_id, project_name), product_id(product_id, product_name)",
    });

    return { ...response };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Exclusão de peça
export async function deletePieceService(piece_id: string) {
  if (!piece_id) return { success: false, ...Errors.MISSING_PARAM("piece_id") };

  try {
    const response = await deleteEntityService({
      tableName: "table_pieces",
      idColumnName: "piece_id",
      idObject: piece_id,
      selectFields: "*, project_id(*), product_id(*)",
    });

    return { ...response };
  } catch (err: any) {
    const isForeignKey = err.message?.includes("foreign key");
    return {
      success: false,
      ...(isForeignKey
        ? Errors.FOREIGN_KEY_VIOLATION("peça")
        : Errors.INTERNAL(err.message)),
    };
  }
}
