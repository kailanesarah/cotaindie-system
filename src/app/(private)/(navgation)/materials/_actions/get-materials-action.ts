"use server";

import type { SearchResult } from "@/app/(private)/_types/search-result";
import { supabaseServer } from "@/lib/supabase/server";
import { MaterialsService } from "@/services/materials-services";
import type { SearchState } from "../../_context/search-provider";

export async function getMaterialsAction(
  params: SearchState,
): Promise<SearchResult<Material>> {
  const { text, sort, pagination, extras } = params;

  try {
    const supabase = await supabaseServer();
    const materialsService = new MaterialsService(supabase);

    const materials = await materialsService.getMaterials({
      text,
      sort,
      pagination,
      extras,
    });

    return materials;
  } catch (err) {
    console.error(err);

    throw new Error("Ocorreu um erro inesperado ao buscar os materiais");
  }
}
