"use server";

import { deleteSchema } from "@/app/(private)/_schema/delete-schema";
import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
import { OrdersService } from "@/services/orders-services";

export const deleteOrderAction = actionClient
  .schema(deleteSchema)
  .action(async ({ parsedInput }): Promise<boolean> => {
    const id = parsedInput;

    try {
      const supabase = await supabaseServer();
      const materialsService = new OrdersService(supabase);

      const order = await materialsService.deleteOrder(id);

      return order;
    } catch (err) {
      console.error(err);

      throw new Error("Ocorreu um erro ao deletar o orçamento.");
    }
  });
