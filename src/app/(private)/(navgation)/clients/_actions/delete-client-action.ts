"use server";

import { deleteSchema } from "@/app/(private)/_schema/delete-schema";
import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
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
    } catch (err) {
      console.error(err);

      throw new Error("Ocorreu um erro ao deletar o cliente.");
    }
  });
