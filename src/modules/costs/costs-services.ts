import { Errors } from "@/utils/errors";
import { generateId } from "@/utils/idGenerator";
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
          throw new Error(
            `Dados do custo inválidos no índice ${index}: ${JSON.stringify(parsed.error.format())}`,
          );
        }

        const cost_id = await generateId("COS");
        const dataWithProject = { ...parsed.data, project_id, cost_id };

        const inserted = await insertEntityToTable(dataWithProject, {
          tableName: "table_costs",
          idColumnName: "cost_id",
          idObject: cost_id,
          selectFields: "*, project_id(project_id, project_name)",
        });

        return { ...inserted, success: true };
      }),
    );

    return insertedCosts;
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Listagem de custos
export async function getCostsService() {
  try {
    const response = await getEntitiesService({
      tableName: "table_costs",
      idColumnName: "cost_id",
      selectFields: "*, project_id(project_id, project_name)",
    });

    return { ...response, success: true };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Buscar custo por ID
export async function getCostByIdService(cost_id: string) {
  if (!cost_id) return { success: false, ...Errors.MISSING_PARAM("cost_id") };

  try {
    const response = await getEntityByIdService({
      tableName: "table_costs",
      idColumnName: "cost_id",
      idObject: cost_id,
      selectFields: "*, project_id(project_id, project_name)",
    });

    if (!response) return { success: false, ...Errors.NOT_FOUND("custo") };

    return { ...response, success: true };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Buscar custos por projeto
export async function getCostsByProjectId(project_id: string) {
  if (!project_id)
    return { success: false, ...Errors.MISSING_PARAM("project_id") };

  try {
    const allCosts = await getEntitiesService({
      tableName: "table_costs",
      idColumnName: "cost_id",
      selectFields: "*, project_id(project_id, project_name)",
    });

    const filteredCosts = (allCosts.data ?? []).filter(
      (item: any) => item.project_id?.project_id === project_id,
    );

    return { success: true, data: filteredCosts };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Atualização de custo
export async function updateCostService(cost_id: string, data: costInput) {
  if (!cost_id) return { success: false, ...Errors.MISSING_PARAM("cost_id") };

  try {
    const parsed = costSchema.partial().safeParse(data);
    if (!parsed.success) {
      return { success: false, ...Errors.INVALID_DATA(parsed.error.format()) };
    }

    const response = await updateEntityInTable(parsed.data, {
      tableName: "table_costs",
      idObject: cost_id,
      idColumnName: "cost_id",
      selectFields: "*, project_id(project_id, project_name)",
    });

    return { ...response, success: true };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.message) };
  }
}

// Exclusão de custo
export async function deleteCostService(cost_id: string) {
  if (!cost_id) return { success: false, ...Errors.MISSING_PARAM("cost_id") };

  try {
    const response = await deleteEntityService({
      tableName: "table_costs",
      idObject: cost_id,
      idColumnName: "cost_id",
      selectFields: "*, project_id(project_id, project_name)",
    });

    return { ...response, success: true };
  } catch (err: any) {
    const isForeignKey = err.message?.includes("foreign key");
    return {
      success: false,
      ...(isForeignKey
        ? Errors.FOREIGN_KEY_VIOLATION("custo")
        : Errors.INTERNAL(err.message)),
    };
  }
}
