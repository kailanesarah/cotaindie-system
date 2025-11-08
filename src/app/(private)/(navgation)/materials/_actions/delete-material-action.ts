"use server";

import { deleteSchema } from "@/app/(private)/_schema/delete-schema";
import { ROUTES } from "@/constants/urls";
import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
import { MaterialsService } from "@/services/materials-services";
import { revalidatePath } from "next/cache";

export const deleteMaterialAction = actionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput }): Promise<boolean> => {
    const id = parsedInput;

    try {
      const supabase = await supabaseServer();
      const materialsService = new MaterialsService(supabase);

      revalidatePath(ROUTES.PRIVATE.PRODUCTS);

      return await materialsService.deleteMaterial(id);
    } catch (err) {
      console.error(err);

      throw new Error("Ocorreu um erro ao deletar o material.");
    }
  });
