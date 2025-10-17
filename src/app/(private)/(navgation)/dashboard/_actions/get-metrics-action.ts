"use server";

import { graphData } from "../_constant/graph-data";
import type { Metrics } from "../_types/metrics";

export async function getMetricsAction(): Promise<Metrics> {
  try {
    return {
      orders: {
        total: 40,
        approved: 30,
        open: 30,
      },
      amount: 1000,
      profit: 2122,
      data: graphData,
    };
  } catch (err) {
    console.error(err);

    throw new Error("Ocorreu um erro inesperado ao buscar as métricas");
  }
}
