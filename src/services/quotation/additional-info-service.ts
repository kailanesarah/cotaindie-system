import { Errors } from "@/utils/errors";
import { generateId } from "@/utils/generate-nano-id";
import { insertEntityToTable } from "../../lib/supabase/supabase-service";
import { informacoesAdicionaisSchema } from "./schemas/additional-info-schema ";

export const insertAdditionalInfo = async (
  quotation_id: string,
  infoData: any,
) => {
  try {
    const parsed = informacoesAdicionaisSchema.safeParse(infoData);
    if (!parsed.success) {
      return { success: false, ...Errors.INVALID_DATA(parsed.error.format()) };
    }

    const info_id = await generateId("INFO");
    const dataToInsert = { ...parsed.data, quotation_id, info_id };

    const response = await insertEntityToTable(dataToInsert, {
      tableName: "table_infos_adicionais",
      idColumnName: "info_id",
      selectFields: "*",
    });

    return { ...response };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.details || err.message) };
  }
};
