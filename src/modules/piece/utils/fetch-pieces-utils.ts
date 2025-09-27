import type { Piece } from "@/modules/cuttingPlan/utils/packing-utils";
import { getPiecesByProjectId } from "../piece-services";

export async function fetchPieces(project_id: string): Promise<Piece[]> {
  try {
    const response = await getPiecesByProjectId(project_id);

    const pieces: Piece[] =
      response?.data?.map((item: any) => ({
        w: item.piece_width,
        h: item.piece_height,
        name: item.piece_name ?? "Sem nome",
        product_id: item.product_id ?? "Sem ID",
        category_id: item.product_id?.product_category ?? "Sem categoria",
      })) ?? [];

    if (pieces.length === 0) {
      throw new Error("Nenhuma peça encontrada para o projeto");
    }

    return pieces;
  } catch (error) {
    throw new Error("Falha ao buscar peças do projeto");
  }
}
