"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { MaterialsService } from "@/services/materials-services";

export async function getCategoriesAction(): Promise<Category[]> {
  try {
    const supabase = await supabaseServer();
    const materialsService = new MaterialsService(supabase);

    const categories = await materialsService.getCategories();

    return categories;
  } catch (err) {
    console.error(err);

    throw new Error("Ocorreu um erro inesperado ao buscar as categorias.");
  }
}
