"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { OrdersService } from "@/services/orders-services";

export async function getOrderByIdAction(orderId: string): Promise<Order> {
  try {
    const supabase = await supabaseServer();
    const ordersService = new OrdersService(supabase);

    const order = await ordersService.getOrderById(orderId);

    if (!order) {
      throw new Error(`Pedido com ID ${orderId} não encontrado.`);
    }

    return order;
  } catch (err) {
    console.error(err);
    throw new Error("Ocorreu um erro inesperado ao buscar o pedido.");
  }
}
