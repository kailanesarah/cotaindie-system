"use server";

import { actionClient } from "@/lib/safe-action";
import { materials } from "../_constants/material-list";
import { materialSchema } from "../_schema/material-schema";

export const usertMaterialAction = actionClient
  .schema(materialSchema)
  .action(async ({ parsedInput }): Promise<Material> => {
    const { id } = parsedInput;

    try {
      if (id) {
        return materials[0];
      }

      return materials[0];
    } catch (err) {
      console.error(err);

      throw new Error("Ocorreu um erro ao adicionar ou atualizar o material.");
    }
  });
