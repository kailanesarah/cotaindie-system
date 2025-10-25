"use server";

import { deleteSchema } from "@/app/(private)/_schema/delete-schema";
import { actionClient } from "@/lib/safe-action";
import { clients } from "../_constants/clients";

export const deleteClientAction = actionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput }): Promise<Client> => {
    const id = parsedInput;

    try {
      return clients[0];
    } catch (err) {
      console.error(err);

      throw new Error("Ocorreu um erro ao deletar o cliente.");
    }
  });
