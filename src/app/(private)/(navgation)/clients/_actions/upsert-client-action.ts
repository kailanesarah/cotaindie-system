"use server";

import { actionClient } from "@/lib/safe-action";
import { clients } from "../_constants/clients-list";
import { clientSchema } from "../_schema/client-schema";

export const usertClientAction = actionClient
  .schema(clientSchema)
  .action(async ({ parsedInput }): Promise<Client> => {
    const { id } = parsedInput;

    try {
      if (id) {
        return clients[0];
      }

      return clients[0];
    } catch (err) {
      console.error(err);

      throw new Error("Ocorreu um erro ao adicionar ou atualizar o cliente.");
    }
  });
