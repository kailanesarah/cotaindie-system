import { insertEntityToTable } from "@/modules/supabase/supabase-service";
import { errorsResponse } from "@/utils/errors-messages";
import { successResponse } from "@/utils/success-messages";
import {
  cuttingPlanSchema,
  type CuttingPlanInput,
} from "../schemas/sheet-schema";

// Criação de plano de corte
export async function appendCuttingPlanService(data: CuttingPlanInput) {
  try {
    console.log("Dados recebidos para inserir plano de corte:", data);

    const parsed = cuttingPlanSchema.safeParse(data);
    if (!parsed.success) {
      console.warn("Erro de validação do schema:", parsed.error.format());
      throw errorsResponse(
        400,
        "Dados do plano de corte inválidos",
        parsed.error.format(),
      );
    }

    const payload = { ...parsed.data };
    console.log("Payload final para inserção:", payload);

    const insertedEntity = await insertEntityToTable(payload, {
      tableName: "table_cuttingPlan",
      idObject: payload.cutPlan_id, // usa o id do payload
      idColumnName: "cutPlan_id", // nome correto da coluna no DB
      selectFields: "*",
    });

    console.log("Resultado da inserção no Supabase:", insertedEntity);

    return successResponse(
      insertedEntity,
      201,
      "Plano de corte criado com sucesso",
    );
  } catch (err: any) {
    console.error("Erro ao inserir plano de corte:", err);
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}
