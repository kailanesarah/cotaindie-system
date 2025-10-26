"use server";

import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
import { MaterialsService } from "@/services/materials-services";
import { materialSchema } from "../_schema/material-schema";

export const usertMaterialAction = actionClient
  .schema(materialSchema)
  .action(async ({ parsedInput }): Promise<Material> => {
    try {
      const supabase = await supabaseServer();
      const materialsService = new MaterialsService(supabase);

      const material = await materialsService.upsertMaterial(parsedInput);

      return material;
    } catch (err) {
      console.error(err);

      throw new Error("Ocorreu um erro ao adicionar ou atualizar o material.");
    }
  });
