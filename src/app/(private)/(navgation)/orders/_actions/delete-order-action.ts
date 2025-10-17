"use server";

import { deleteSchema } from "@/app/(private)/_schema/delete-schema";
import { actionClient } from "@/lib/safe-action";
import { orders } from "../_constants/orders-list";

export const deleteOrderAction = actionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput }): Promise<Order> => {
    const id = parsedInput;

    try {
      return orders[0];
    } catch (err) {
      console.error(err);

      throw new Error("Ocorreu um erro ao deletar o orçamento.");
    }
  });
