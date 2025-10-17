"use server";

import { actionClient } from "@/lib/safe-action";
import { orders } from "../../(navgation)/orders/_constants/orders-list";
import { orderSchema } from "../schema/order-schema";

export const upsertOrderAction = actionClient
  .schema(orderSchema)
  .action(async ({ parsedInput }): Promise<Order> => {
    const { id } = parsedInput;

    console.log(parsedInput);

    try {
      if (id) {
        return orders[0];
      }

      return orders[0];
    } catch (err) {
      console.error(err);
      throw new Error("Ocorreu um erro ao processar o pedido.");
    }
  });
