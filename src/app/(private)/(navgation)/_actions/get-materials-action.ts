"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { MaterialsService } from "@/services/materials-services";

export async function getMaterialsAction(): Promise<Material[]> {
  try {
    const supabase = await supabaseServer();
    const materialsService = new MaterialsService(supabase);

    const materials = await materialsService.getMaterials();

    return materials.items;
  } catch (err) {
    console.error(err);

    throw new Error("Ocorreu um erro inesperado ao buscar as categorias.");
  }
}
