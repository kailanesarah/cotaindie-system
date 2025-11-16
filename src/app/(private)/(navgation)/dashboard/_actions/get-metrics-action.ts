"use server";

import { getProjectSummary } from "@/app/(private)/order/functions/project-summary";
import { supabaseServer } from "@/lib/supabase/server";
import { OrdersService } from "@/services/orders-services";
import type { Metrics } from "../_types/metrics";
import { getCurrentMonthRange } from "../_utils/get-current-month-range";

export async function getMetricsAction(): Promise<Metrics> {
  try {
    const supabase = await supabaseServer();
    const ordersService = new OrdersService(supabase);

    const { startDate, endDate } = getCurrentMonthRange();

    const { items: approvedOrders } = await ordersService.getOrders(undefined, {
      dateRange: { startDate, endDate },
      status: "APPROVED",
      approvedPeriod: true,
    });

    const { items: allOrders } = await ordersService.getOrders(undefined, {
      dateRange: { startDate, endDate },
    });

    function computeOrder(order: Order) {
      const summaries = order.projects.map((p, idx) =>
        getProjectSummary(p, idx),
      );

      const discountPercent = order.discountPercent ?? 0;

      const totalProjectValue = summaries.reduce(
        (acc, s) => acc + s.totalValue,
        0,
      );

      const totalProfitBeforeDiscount = summaries.reduce(
        (acc, s) => acc + s.profit + s.commission,
        0,
      );

      const finalAmount = totalProjectValue * (1 - discountPercent);

      const profitAfterDiscount =
        totalProfitBeforeDiscount - (totalProjectValue - finalAmount);

      return { finalAmount, totalProjectValue, profit: profitAfterDiscount };
    }

    const totalAmount = approvedOrders.reduce(
      (acc, o) => acc + computeOrder(o).finalAmount,
      0,
    );

    const totalProfit = approvedOrders.reduce(
      (acc, o) => acc + computeOrder(o).profit,
      0,
    );

    const dailyMap: Record<
      string,
      { revenue: number; approved: number; profit: number }
    > = {};

    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let d = start; d <= end; ) {
      const dateStr = d.toISOString().split("T")[0];
      dailyMap[dateStr] = { revenue: 0, approved: 0, profit: 0 };

      d = new Date(d.getTime() + 24 * 60 * 60 * 1000);
    }

    for (const order of allOrders) {
      const date = new Date(order.createdAt).toISOString().split("T")[0];
      const computed = computeOrder(order);

      if (!dailyMap[date])
        dailyMap[date] = { revenue: 0, approved: 0, profit: 0 };
      dailyMap[date].revenue += computed.finalAmount;
    }

    for (const order of approvedOrders) {
      const date = new Date(order.approvedAt!).toISOString().split("T")[0];
      const computed = computeOrder(order);

      if (!dailyMap[date])
        dailyMap[date] = { revenue: 0, approved: 0, profit: 0 };
      dailyMap[date].approved += computed.finalAmount;
      dailyMap[date].profit += computed.profit;
    }

    const data = Object.entries(dailyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, d]) => ({
        date,
        total: d.revenue,
        approved: d.approved,
        profit: d.profit,
      }));

    return {
      orders: {
        total: allOrders.length,
        approved: approvedOrders.length,
        open: allOrders.length - approvedOrders.length,
      },
      amount: totalAmount,
      profit: totalProfit,
      data,
    };
  } catch (err) {
    console.error(err);

    throw new Error("Ocorreu um erro inesperado ao buscar as métricas");
  }
}
