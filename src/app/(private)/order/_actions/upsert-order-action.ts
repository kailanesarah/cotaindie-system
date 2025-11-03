"use server";

import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
import { OrdersService } from "@/services/orders-services";
import { orderSchema } from "../schema/order-schema";

export const upsertOrderAction = actionClient
  .schema(orderSchema)
  .action(async ({ parsedInput }): Promise<Order> => {
    try {
      const supabase = await supabaseServer();
      const orderService = new OrdersService(supabase);

      const order = await orderService.upsertOrder(parsedInput);

      return order;
    } catch (err) {
      console.error(err);
      throw new Error("Ocorreu um erro ao processar o pedido.");
    }
  });
