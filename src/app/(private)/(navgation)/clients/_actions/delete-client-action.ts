"use server";

import { deleteSchema } from "@/app/(private)/_schema/delete-schema";
import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
import type { PostgresError } from "@/services/base-service";
import { ClientsService } from "@/services/clients-services";

export const deleteClientAction = actionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput }): Promise<boolean> => {
    const id = parsedInput;

    try {
      const supabase = await supabaseServer();
      const clientsService = new ClientsService(supabase);

      await clientsService.deleteClient(id);

      return true;
    } catch (err: unknown) {
      const pgErr = err as PostgresError;

      if (pgErr.code === "23503") {
        throw new Error(
          "Não é possível deletar este cliente porque ele está sendo usado em algum orçamento.",
        );
      }

      throw new Error("Ocorreu um erro ao deletar o cliente.");
    }
  });
