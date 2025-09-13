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
        product_id: item.product_id ?? "Sem ID", // agora pegando o ID real
        category_id: item.product_id?.product_category ?? "Sem categoria",
      })) ?? [];

    if (pieces.length === 0) {
      throw new Error("Nenhuma peça encontrada para o projeto");
    }

    console.log(
      "IDs das peças capturadas:",
      pieces.map((p) => p.product_id),
    );

    console.log(
      "Categorias das peças capturadas:",
      pieces.map((p) => p.category_id),
    );

    return pieces;
  } catch (error) {
    console.error("Erro ao buscar peças do projeto:", error);
    throw new Error("Falha ao buscar peças do projeto");
  }
}
