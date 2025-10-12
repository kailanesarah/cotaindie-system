import { Errors } from "@/utils/errors";
import { generateId } from "@/utils/idGenerator";
import { insertEntityToTable } from "../supabase/supabase-service";

export const insertQuotationProjects = async (
  quotation_id: string,
  project_ids: string[],
) => {
  if (!project_ids || project_ids.length === 0) return [];

  try {
    const results = await Promise.all(
      project_ids.map(async (project_id) => {
        const quo_proj_id = await generateId("QUOPROJ");
        const reponse = await insertEntityToTable(
          { quotation_id, project_id, quo_proj_id },
          {
            tableName: "table_quotation_project",
            idColumnName: "quo_proj_id",
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
