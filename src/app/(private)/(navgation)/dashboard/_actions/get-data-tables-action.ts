"use server";

import { orders } from "../../orders/_constants/orders-list";

import { materialsData } from "../_constant/spent-material-data";
import type { DataTables } from "../_types/data-tables";

export async function getDataTablesAction(): Promise<DataTables> {
  try {
    return {
      orders: orders,
      materials: materialsData,
    };
  } catch (err) {
    console.error(err);

    throw new Error("Ocorreu um erro ao buscar dados de vendas.");
  }
}
