"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { OrdersService } from "@/services/orders-services";
import type { TMaterialData } from "../_components/table-material";
import type { DataTables } from "../_types/data-tables";
import { getCurrentMonthRange } from "../_utils/get-current-month-range";

function calculateMeasureBase(mat: any) {
  if (mat.measureType === "M2") {
    if (mat.measure.length === 2) {
      const [cmL, cmA] = mat.measure;
      return (cmL / 100) * (cmA / 100);
    }
    const cm = mat.measure[0];
    const m = cm / 100;
    return m * m;
  }

  if (mat.measureType === "ML") {
    const cm = mat.measure[0];
    return cm / 100;
  }

  return 1;
}

function calculateSpent(mat: any, piece: any) {
  if (mat.measureType === "M2") {
    if (piece.measure.length === 2) {
      const [cmL, cmA] = piece.measure;
      return (cmL / 100) * (cmA / 100) * piece.qtde;
    }
    const cm = piece.measure[0];
    const m = cm / 100;
    return m * m * piece.qtde;
  }

  if (mat.measureType === "ML") {
    const cm = piece.measure[0];
    return (cm / 100) * piece.qtde;
  }

  return piece.qtde;
}

export async function getDataTablesAction(): Promise<DataTables> {
  try {
    const supabase = await supabaseServer();
    const ordersService = new OrdersService(supabase);

    const { startDate, endDate } = getCurrentMonthRange();

    const { items: approvedOrders } = await ordersService.getOrders(
      {
        text: [],
        sort: "DESC",
        pagination: { page: 1, perPage: 999, totalPages: 1 },
        extras: [],
      },
      {
        status: "APPROVED",
        dateRange: { startDate, endDate },
        approvedPeriod: true,
      },
    );

    const map = new Map<string, TMaterialData>();

    for (const order of approvedOrders) {
      for (const project of order.projects ?? []) {
        for (const piece of project.pieces ?? []) {
          const mat = piece.material;
          const code = mat.code;

          const measureBase = calculateMeasureBase(mat);
          const spent = calculateSpent(mat, piece);

          if (!map.has(code)) {
            map.set(code, {
              material: {
                code: mat.code,
                name: mat.name,
                measure: mat.measure,
                measureType: mat.measureType,
              },
              measureBase,
              spent: 0,
            });
          }

          const entry = map.get(code)!;
          entry.spent += spent;
        }
      }
    }

    const materialsArray = Array.from(map.values())
      .sort((a, b) => b.spent - a.spent)
      .slice(0, 5);

    const { items: latestOrders } = await ordersService.getOrders(
      {
        text: [],
        sort: "DESC",
        pagination: { page: 1, perPage: 5, totalPages: 1 },
        extras: [],
      },
      { limit: 5 },
    );

    return {
      orders: latestOrders,
      materials: materialsArray,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao gerar data table de materiais.");
  }
}
