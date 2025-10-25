import type { SearchState } from "@/app/(private)/(navgation)/_context/search-provider";
import type { SearchResult } from "@/app/(private)/_types/search-result";
import { generateId } from "@/utils/generate-nano-id";
import type { SupabaseClient } from "@supabase/supabase-js";
import { BaseService } from "./base-service";

export class MaterialsService extends BaseService {
  constructor(supabase: SupabaseClient) {
    super(supabase);
  }

  async upsertMaterial(material: Partial<Material>) {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser();
      if (authError) throw new Error(`Auth error: ${authError.message}`);
      if (!user) throw new Error("Auth error: User not authenticated");

      const materialToUpsert: any = {
        ...material,
        measure_type: material.measureType,
        waste_tax: material.wasteTax,
        base_value: material.baseValue,
        cut_direction: material.cutDirection,
      };

      delete materialToUpsert.measureType;
      delete materialToUpsert.wasteTax;
      delete materialToUpsert.baseValue;
      delete materialToUpsert.cutDirection;
      delete materialToUpsert.category;

      if (!material.id) {
        materialToUpsert.code = await generateId();

        delete materialToUpsert.id;
      } else {
        const { data: existing, error: fetchError } = await this.supabase
          .from("materials")
          .select("code")
          .eq("id", material.id)
          .single();

        if (fetchError) {
          throw new Error(`Fetch material code error: ${fetchError.message}`);
        }

        materialToUpsert.code = existing.code;
      }

      const { data, error: upsertError } = await this.supabase
        .from("materials")
        .upsert(
          { ...materialToUpsert, user_id: user.id },
          { onConflict: "id", ignoreDuplicates: false },
        )
        .select(
          "*, materials_categories_relation(category:materials_categories(id, name))",
        )
        .single();

      if (upsertError)
        throw new Error(`Upsert material error: ${upsertError.message}`);

      return this.formatMaterial(data);
    } catch (err) {
      this.handleError(err, "MaterialsService.upsertMaterial");
    }
  }

  async getMaterials(params?: SearchState): Promise<SearchResult<Material>> {
    try {
      let query = this.supabase.from("materials").select(
        `
          *,
          materials_categories_relation:materials_categories_relation(
            category:materials_categories(id, name)
          )
        `,
        { count: "exact" },
      );

      if (params?.text?.length) {
        const searchableFields = ["name", "description", "code"];

        const orExpressions = params.text
          .flatMap((t) => searchableFields.map((f) => `${f}.ilike.%${t}%`))
          .join(",");

        query = query.or(orExpressions);
      }

      if (params?.extras && params.extras.length > 0) {
        for (const extra of params.extras) {
          if (extra.key === "category") {
            const { data: materialIds, error: relError } = await this.supabase
              .from("materials_categories_relation")
              .select("material_id")
              .eq("category_id", extra.value);

            if (relError) throw relError;

            const ids = (materialIds ?? []).map((r) => r.material_id);
            query = query.in("id", ids);
          } else {
            query = query.eq(extra.key, extra.value);
          }
        }
      }

      if (params?.sort) {
        query = query.order("created_at", { ascending: params.sort === "ASC" });
      }

      const page = params?.pagination?.page ?? 1;
      const perPage = params?.pagination?.perPage ?? 10;
      const from = (page - 1) * perPage;
      const to = from + perPage - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) {
        throw error;
      }

      const items = (data ?? []).map(this.formatMaterial);
      const totalPages = Math.ceil((count ?? items.length) / perPage);

      return { items, page, totalPages };
    } catch (err) {
      this.handleError(err, "MaterialsService.getMaterials");
    }
  }

  async getMaterialById(id: string) {
    try {
      const { data, error } = await this.supabase
        .from("materials")
        .select(
          `
          *,
          materials_categories_relation:materials_categories_relation(
            category:materials_categories(id, name)
          )
        `,
        )
        .eq("id", id)
        .single();

      if (error) throw error;

      return this.formatMaterial(data);
    } catch (err) {
      this.handleError(err, "MaterialsService.getMaterialById");
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const { data, error } = await this.supabase
        .from("materials_categories")
        .select("id, name");

      if (error) throw error;

      return data ?? [];
    } catch (err) {
      this.handleError(err, "MaterialsService.getCategories");
    }
  }

  private formatMaterial(dbMaterial: any): Material {
    return {
      id: dbMaterial.id,
      code: dbMaterial.code,
      category: dbMaterial.materials_categories_relation?.[0]?.category || {
        id: "",
        name: "",
      },
      name: dbMaterial.name,
      description: dbMaterial.description,
      measureType: dbMaterial.measure_type,
      unit: dbMaterial.unit,
      wasteTax: dbMaterial.waste_tax,
      baseValue: dbMaterial.base_value,
      measure: dbMaterial.measure,
      cutDirection: dbMaterial.cut_direction,
    };
  }

  transformMaterials(dbMaterials: any[]): Material[] {
    return dbMaterials.map(this.formatMaterial);
  }
}
