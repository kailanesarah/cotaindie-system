"use server";

import { deleteSchema } from "@/app/(private)/_schema/delete-schema";
import { ROUTES } from "@/constants/urls";
import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
import { ClientsService } from "@/services/clients-services";
import { revalidatePath } from "next/cache";

export const deleteClientAction = actionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput }): Promise<boolean> => {
    const id = parsedInput;

    try {
      const supabase = await supabaseServer();
      const clientsService = new ClientsService(supabase);

      revalidatePath(ROUTES.PRIVATE.CLIENTS);

      return await clientsService.deleteClient(id);
    } catch (err) {
      console.error(err);

      throw new Error("Ocorreu um erro ao deletar o cliente.");
    }
  });
