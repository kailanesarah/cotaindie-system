"use server";

import { deleteSchema } from "@/app/(private)/_schema/delete-schema";
import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
import type { PostgresError } from "@/services/base-service";
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
    } catch (err: unknown) {
      const pgErr = err as PostgresError;

      if (pgErr.code === "23503") {
        throw new Error(
          "Não é possível deletar este material porque ele está sendo usado em algum orçamento.",
        );
      }

      throw new Error("Ocorreu um erro ao deletar o material.");
    }
  });
