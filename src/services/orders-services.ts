import type { SearchState } from "@/app/(private)/(navgation)/_context/search-provider";
import type { SearchResult } from "@/app/(private)/_types/search-result";
import type { SupabaseClient } from "@supabase/supabase-js";
import { BaseService } from "./base-service";

export class OrdersService extends BaseService {
  constructor(supabase: SupabaseClient) {
    super(supabase);
  }

  async getOrders(params?: SearchState): Promise<SearchResult<Order>> {
    try {
      let query = this.supabase.from("orders").select(
        `
      *,
      client:clients(id, code, name, notes, type),
      projects:orders_projects(
        *,
        pieces:orders_pieces(
          *,
          material:materials(id, name, description),
          material_snapshot:orders_pieces_materials_snapshot(*)
        )
      )
      `,
        { count: "exact" },
      );

      if (params?.text?.length) {
        const searchableFields = [
          "name",
          "code",
          "notes",
          "included",
          "excluded",
          "team_notes",
        ];
        const orExpressions = params.text
          .flatMap((t) => searchableFields.map((f) => `${f}.ilike.%${t}%`))
          .join(",");
        query = query.or(orExpressions);
      }

      if (params?.extras?.length) {
        for (const extra of params.extras) {
          if (extra.key === "client") {
            const { data: orderIds, error: relError } = await this.supabase
              .from("orders")
              .select("id")
              .eq("client_id", extra.value);
            if (relError) throw relError;

            const ids = (orderIds ?? []).map((r) => r.id);
            if (ids.length) query = query.in("id", ids);
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
      if (error) throw error;

      const items = (data ?? []).map((order) => ({
        ...order,
        projects: (order.projects ?? []).map((project: any) => ({
          ...project,
          pieces: (project.pieces ?? []).map((piece: any) => {
            const snapshot = piece.material_snapshot?.[0] ?? {};
            const materialBase = piece.material ?? {};

            return {
              id: piece.id,
              name: piece.name,
              qtde: piece.qtde,
              measure: piece.measure,
              project_id: piece.project_id,
              material: {
                ...materialBase,
                ...snapshot,
              },
            };
          }),
        })),
      }));

      const totalPages = Math.ceil((count ?? 0) / perPage);

      return { items: items as Order[], page, totalPages };
    } catch (err) {
      this.handleError(err, "OrdersService.getOrders");
    }
  }

  async deleteOrder(id: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from("orders")
        .delete()
        .eq("id", id);

      if (error) throw error;

      return true;
    } catch (err) {
      this.handleError(err, "OrdersService.deleteOrder");
    }
  }
}
