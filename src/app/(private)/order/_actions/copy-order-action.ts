"use server";

import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
import { OrdersService } from "@/services/orders-services";
import { z } from "zod";

export const copyOrderAction = actionClient
  .schema(z.string())
  .action(async ({ parsedInput: orderId }) => {
    const supabase = await supabaseServer();
    const service = new OrdersService(supabase);

    return service.copyOrder(orderId);
  });
