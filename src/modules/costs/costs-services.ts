// costs-services.ts

import { errorsResponse } from "@/utils/errors-messages";
import { generateId } from "@/utils/idGenerator";
import { successResponse } from "@/utils/success-messages";
import {
  deleteEntityService,
  getEntitiesService,
  getEntityByIdService,
  insertEntityToTable,
  updateEntityInTable,
} from "../supabase/supabase-service";
import { costSchema, type costInput } from "./schemas/costs-schemas";

// Criação de múltiplos custos
export async function appendCostService(project_id: string, data: costInput[]) {
  try {
    const insertedCosts = await Promise.all(
      data.map(async (cost, index) => {
        const parsed = costSchema.safeParse(cost);
        if (!parsed.success) {
          throw errorsResponse(
            400,
            `Dados do custo inválidos no índice ${index}`,
            parsed.error.format(),
          );
        }

        const cost_id = await generateId("COS");
        const dataWithProject = { ...parsed.data, project_id, cost_id };

        return insertEntityToTable(dataWithProject, {
          tableName: "table_costs",
          idColumnName: "cost_id",
          selectFields: "*, project_id(project_id, project_name)",
        });
      }),
    );

    return successResponse(insertedCosts, 201, "Custos criados com sucesso");
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}

// Listagem de custos
export async function getCostsService() {
  try {
    const data = await getEntitiesService({
      tableName: "table_costs",
      idColumnName: "cost_id",
      selectFields: "*, project_id(project_id, project_name)",
    });

    return successResponse(data, 200, "Custos encontrados");
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}

// Buscar custo por ID
export async function getCostByIdService(cost_id: string) {
  try {
    const data = await getEntityByIdService({
      tableName: "table_costs",
      idColumnName: "cost_id",
      idObject: cost_id,
      selectFields: "*, project_id(project_id, project_name)",
    });

    return successResponse(data, 200, "Custo encontrado");
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}

// Buscar custos por projeto
export async function getCostsByProjectId(project_id: string) {
  try {
    const data = await getEntitiesService({
      tableName: "table_costs",
      idColumnName: "project_id",
      idObject: project_id,
      selectFields: "*, project_id(project_id, project_name)",
    });

    return successResponse(data, 200, "Custos do projeto encontrados");
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}

// Atualização de custo
export async function updateCostService(cost_id: string, data: costInput) {
  try {
    const parsed = costSchema.partial().safeParse(data);
    if (!parsed.success) {
      throw errorsResponse(
        400,
        "Dados do custo inválidos",
        parsed.error.format(),
      );
    }

    const updatedEntity = await updateEntityInTable(parsed.data, {
      tableName: "table_costs",
      idObject: cost_id,
      idColumnName: "cost_id",
      selectFields: "*, project_id(project_id, project_name)",
    });

    return successResponse(updatedEntity, 200, "Custo atualizado com sucesso");
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}

// Exclusão de custo
export async function deleteCostService(cost_id: string) {
  try {
    const deletedEntity = await deleteEntityService({
      tableName: "table_costs",
      idObject: cost_id,
      idColumnName: "cost_id",
      selectFields: "*, project_id(*)",
    });

    return successResponse(deletedEntity, 204, "Custo deletado com sucesso");
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}
