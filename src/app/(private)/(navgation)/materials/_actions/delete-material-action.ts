"use server";

import { deleteSchema } from "@/app/(private)/_schema/delete-schema";
import { actionClient } from "@/lib/safe-action";
import { materials } from "../_constants/material-list";

export const deleteMaterialAction = actionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput }): Promise<Material> => {
    const id = parsedInput;

    try {
      return materials[0];
    } catch (err) {
      console.error(err);

      throw new Error("Ocorreu um erro ao deletar o material.");
    }
  });
