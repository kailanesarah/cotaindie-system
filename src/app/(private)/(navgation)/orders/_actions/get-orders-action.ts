"use server";

import type { SearchResult } from "@/app/(private)/_types/search-result";
import { supabaseServer } from "@/lib/supabase/server";
import { OrdersService } from "@/services/orders-services";
import type { SearchState } from "../../_context/search-provider";

export async function getOrdersAction(
  params: SearchState,
): Promise<SearchResult<Order>> {
  const { text, sort, pagination, extras } = params;

  try {
    const supabase = await supabaseServer();
    const orderService = new OrdersService(supabase);

    const orders = await orderService.getOrders({
      text,
      sort,
      pagination,
      extras,
    });

    return orders;
  } catch (err) {
    console.error(err);

    throw new Error("Ocorreu um erro inesperado ao buscar os orçamentos");
  }
}
