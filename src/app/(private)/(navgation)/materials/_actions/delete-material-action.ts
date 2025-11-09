"use server";

import { deleteSchema } from "@/app/(private)/_schema/delete-schema";
import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
import { MaterialsService } from "@/services/materials-services";

export const deleteMaterialAction = actionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput }): Promise<boolean> => {
    const id = parsedInput;

    try {
      const supabase = await supabaseServer();
      const materialsService = new MaterialsService(supabase);

      await materialsService.deleteMaterial(id);

      return true;
    } catch (err) {
      console.error(err);

      throw new Error("Ocorreu um erro ao deletar o material.");
    }
  });
