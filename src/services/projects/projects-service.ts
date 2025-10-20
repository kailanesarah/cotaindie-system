import { Errors } from "@/utils/errors";
import { generateId } from "@/utils/idGenerator";
import {
  deleteEntityService,
  getEntitiesService,
  getEntityByIdService,
  insertEntityToTable,
  updateEntityInTable,
} from "../supabase/supabase-service";

import { appendCostService } from "../costs/costs-services";
import { type costInput } from "../costs/schemas/costs-schemas";
import { appendPieceService } from "../piece/piece-services";
import { type pieceInput } from "../piece/schemas/pieces-schemas";
import { projectSchema, type projectInput } from "./schemas/project-schema";

// Criar projeto com custos e peças
export async function appendProjectService(data: {
  project: projectInput;
  costs: costInput[];
  pieces: pieceInput[];
}) {
  try {
    const { project, costs, pieces } = data;

    const parsed = projectSchema.safeParse(project);
    if (!parsed.success) {
      return { success: false, ...Errors.INVALID_DATA(parsed.error.format()) };
    }

    const project_id = await generateId("PRO");

    const insertedProject = await insertEntityToTable(
      { ...parsed.data, project_id },
      {
        tableName: "table_projects",
        idColumnName: "project_id",
        selectFields: "*, client_id(client_id, client_name)",
      },
    );

    const [insertedCosts, insertedPieces] = await Promise.all([
      appendCostService(project_id, costs),
      appendPieceService(project_id, pieces),
    ]);

    return {
      success: true,

      project: insertedProject.data,
      costs: insertedCosts,
      pieces: insertedPieces,
    };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.details) };
  }
}

// Listar projetos
export async function getProjectsService() {
  try {
    const response = await getEntitiesService({
      tableName: "table_projects",
      idColumnName: "project_id",
      selectFields: "*, client_id(client_id, client_name)",
    });

    return { ...response };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.details) };
  }
}

// Buscar projeto por ID
export async function getProjectByIdService(project_id: string) {
  if (!project_id)
    return { success: false, ...Errors.MISSING_PARAM("project_id") };

  try {
    const response = await getEntityByIdService({
      tableName: "table_projects",
      idColumnName: "project_id",
      idObject: project_id,
      selectFields: "*, client_id(client_id, client_name)",
    });

    if (!response) return { success: false, ...Errors.NOT_FOUND("projeto") };

    return { ...response };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.details) };
  }
}

// Atualizar projeto (sem recriar custos/peças)
export async function updateProjectService(
  project_id: string,
  data: projectInput,
) {
  if (!project_id)
    return { success: false, ...Errors.MISSING_PARAM("project_id") };

  try {
    const parsed = projectSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, ...Errors.INVALID_DATA(parsed.error.format()) };
    }

    const response = await updateEntityInTable(parsed.data, {
      tableName: "table_projects",
      idObject: project_id,
      idColumnName: "project_id",
      selectFields: "*, client_id(client_id, client_name)",
    });

    return { ...response };
  } catch (err: any) {
    return { success: false, ...Errors.INTERNAL(err.details) };
  }
}

// Excluir projeto
export async function deleteProjectService(project_id: string) {
  if (!project_id)
    return { success: false, ...Errors.MISSING_PARAM("project_id") };

  try {
    const response = await deleteEntityService({
      tableName: "table_projects",
      idObject: project_id,
      idColumnName: "project_id",
      selectFields: "*",
    });

    return { ...response };
  } catch (err: any) {
    const isForeignKey = err.message?.includes("foreign key");
    return {
      success: false,
      ...(isForeignKey
        ? Errors.FOREIGN_KEY_VIOLATION("projeto")
        : Errors.INTERNAL(err.details)),
    };
  }
}
