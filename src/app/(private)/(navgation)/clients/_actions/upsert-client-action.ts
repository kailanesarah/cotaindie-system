"use server";

import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
import { ClientsService } from "@/services/clients-services";
import { clientSchema } from "../_schema/client-schema";

export const upsertClientAction = actionClient
  .schema(clientSchema)
  .action(async ({ parsedInput }): Promise<Client> => {
    try {
      const supabase = await supabaseServer();
      const clientsService = new ClientsService(supabase);

      const client = await clientsService.upsertClient(parsedInput);

      return client;
    } catch (err) {
      console.error(err);

      throw new Error("Ocorreu um erro ao adicionar ou atualizar o cliente.");
    }
  });
