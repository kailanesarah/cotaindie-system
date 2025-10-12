"use server";

import { copySchema } from "@/app/(private)/_schema/copy-schema";
import { actionClient } from "@/lib/safe-action";
import { orders } from "../_constants/orders-list";

export const copyOrderAction = actionClient
  .schema(copySchema)
  .action(async ({ parsedInput }): Promise<Order> => {
    const id = parsedInput;

    try {
      return orders[0];
    } catch (err) {
      console.error(err);

      throw new Error("Ocorreu um erro ao duplicar o orçamento.");
    }
  });
