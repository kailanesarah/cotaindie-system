import { Errors } from "@/utils/errors";
import { generateId } from "@/utils/generate-nano-id";
import { insertEntityToTable } from "../../lib/supabase/supabase-service";
import { condicoesPagamentoSchema } from "./schemas/payment-conditions-schema";

export const insertPaymentConditions = async (
  quotation_id: string,
  paymentData: any,
) => {
  try {
    const parsed = condicoesPagamentoSchema.safeParse(paymentData);
    if (!parsed.success) {
      return { success: false, ...Errors.INVALID_DATA(parsed.error.format()) };
    }

    const pag_id = await generateId("PAG");
    const dataToInsert = { ...parsed.data, quotation_id, pag_id };

    const response = await insertEntityToTable(dataToInsert, {
      tableName: "table_condicoes_pagamento",
      idColumnName: "pag_id",
      selectFields: "*",
    });

    return { ...response };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.details || err.message) };
  }
};
