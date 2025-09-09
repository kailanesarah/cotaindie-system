// project-service.ts

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
    console.log("Criando projeto com dados:", project);

    const parsed = projectSchema.safeParse(project);
    if (!parsed.success) {
      console.error("Validação falhou:", parsed.error.format());
      throw errorsResponse(
        400,
        "Dados do projeto inválidos",
        parsed.error.format(),
      );
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

    return successResponse(
      {
        project: insertedProject,
        costs: insertedCosts,
        pieces: insertedPieces,
      },
      201,
      "Projeto e itens associados criados com sucesso",
    );
  } catch (err: any) {
    console.error("Erro ao criar projeto:", err);
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}

// Listar projetos
export async function getProjectsService() {
  try {
    const data = await getEntitiesService({
      tableName: "table_projects",
      idColumnName: "project_id",
      selectFields: "*, client_id(client_id, client_name)",
    });

    return successResponse(data, 200, "Projetos encontrados");
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}

// Buscar projeto por ID
export async function getProjectByIdService(project_id: string) {
  try {
    const data = await getEntityByIdService({
      tableName: "table_projects",
      idColumnName: "project_id",
      idObject: project_id,
      selectFields: "*, client_id(client_id, client_name)",
    });

    return successResponse(data, 200, "Projeto encontrado");
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}

// Atualizar projeto (sem recriar custos/peças)
export async function updateProjectService(
  project_id: string,
  data: projectInput,
) {
  try {
    const parsed = projectSchema.safeParse(data);
    if (!parsed.success) {
      throw errorsResponse(
        400,
        "Dados do projeto inválidos",
        parsed.error.format(),
      );
    }

    const updatedEntity = await updateEntityInTable(parsed.data, {
      tableName: "table_projects",
      idObject: project_id,
      idColumnName: "project_id",
      selectFields: "*, client_id(client_id, client_name)",
    });

    return successResponse(
      updatedEntity,
      200,
      "Projeto atualizado com sucesso",
    );
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}

// Excluir projeto
export async function deleteProjectService(project_id: string) {
  try {
    console.log(project_id);
    const deletedEntity = await deleteEntityService({
      tableName: "table_projects",
      idObject: project_id,
      idColumnName: "project_id",
      selectFields: "*",
    });

    return successResponse(deletedEntity, 204, "Projeto deletado com sucesso");
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno",
      err.details,
    );
  }
}
