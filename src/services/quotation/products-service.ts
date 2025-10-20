import { Errors } from "@/utils/errors";
import { generateId } from "@/utils/idGenerator";
import { insertEntityToTable } from "../supabase/supabase-service";

export const insertQuotationProducts = async (
  quotation_id: string,
  product_ids: string[],
) => {
  if (!product_ids || product_ids.length === 0) return [];

  try {
    const results = await Promise.all(
      product_ids.map(async (product_id) => {
        const quo_pro_id = await generateId("QUOPRO"); // gera ID único para cada produto
        const reponse = await insertEntityToTable(
          { quotation_id, product_id, quo_pro_id },
          {
            tableName: "table_quotation_product",
            idColumnName: "quo_pro_id",
            selectFields: "*",
          },
        );

        return { ...reponse };
      }),
    );

    return results;
  } catch (err: any) {
    return [{ success: false, ...Errors.INTERNAL(err.details || err.message) }];
  }
};
