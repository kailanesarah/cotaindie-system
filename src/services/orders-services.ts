import type { SearchState } from "@/app/(private)/(navgation)/_context/search-provider";
import type { SearchResult } from "@/app/(private)/_types/search-result";
import type { OrderType } from "@/app/(private)/order/schema/order-schema";
import { generateId } from "@/utils/generate-nano-id";
import { mapOrderFromSupabase } from "@/utils/order-mapper";
import type { SupabaseClient } from "@supabase/supabase-js";
import { BaseService } from "./base-service";

export class OrdersService extends BaseService {
  constructor(supabase: SupabaseClient) {
    super(supabase);
  }
  async upsertOrder(order: OrderType): Promise<Order> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser();
      if (authError) throw new Error(`Auth error: ${authError.message}`);
      if (!user) throw new Error("Auth error: User not authenticated");

      let orderCode: string;
      if (!order.id) {
        orderCode = await generateId();
      } else {
        const { data: existingOrder, error: fetchCodeError } =
          await this.supabase
            .from("orders")
            .select("code")
            .eq("id", order.id)
            .single();
        if (fetchCodeError)
          throw new Error(`Fetch order code error: ${fetchCodeError.message}`);
        orderCode = existingOrder.code;
      }

      const {
        id,
        client,
        advanceAmount,
        advancePaymentMethod,
        expirationDays,
        initialDate,
        rawAmount,
        deliveryDays,
        discountPercent,
        installmentCount,
        paymentMethod,
        projects,
        teamNotes,
        ...rest
      } = order;

      const orderToUpsert = {
        ...rest,
        id,
        user_id: user.id,
        code: orderCode,
        client_id: client,
        expiration_days: expirationDays,
        initial_date: initialDate,
        raw_amount: rawAmount,
        delivery_days: deliveryDays ?? 0,
        discount_percent: discountPercent ?? 0,
        payment_method: paymentMethod,
        advance_amount: advanceAmount ?? 0,
        advance_payment_method: advancePaymentMethod ?? null,
        installment_count: installmentCount ?? 1,
        team_notes: teamNotes,
      };

      const { data: orderData, error: orderError } = await this.supabase
        .from("orders")
        .upsert({ ...orderToUpsert, code: orderCode })
        .select()
        .single();
      if (orderError)
        throw new Error(`Order upsert error: ${orderError.message}`);

      const { data: existingProjects } = await this.supabase
        .from("orders_projects")
        .select("id")
        .eq("order_id", orderData.id);

      const existingProjectIds = existingProjects?.map((p) => p.id) ?? [];
      const newProjectIdsSet = new Set(
        projects.map((p) => p.id).filter(Boolean),
      );

      const projectsToDelete = existingProjectIds.filter(
        (id) => !newProjectIdsSet.has(id),
      );
      if (projectsToDelete.length) {
        await this.supabase
          .from("orders_projects")
          .delete()
          .in("id", projectsToDelete);
      }

      for (const project of projects) {
        const projectToUpsert = {
          id: project.id,
          order_id: orderData.id,
          name: project.name,
          costs: project.costs,
          qtde: project.qtde,
          monthly_expense: project.monthlyExpense ?? 0,
          profit_rate: project.profitRate ?? 0,
          comission: project.comission ?? 0,
        };

        const { data: projectData, error: projectError } = await this.supabase
          .from("orders_projects")
          .upsert(projectToUpsert)
          .select()
          .single();
        if (projectError)
          throw new Error(`Project upsert error: ${projectError.message}`);

        const { data: existingPieces } = await this.supabase
          .from("orders_pieces")
          .select("id")
          .eq("project_id", projectData.id);

        const existingPieceIds = existingPieces?.map((p) => p.id) ?? [];
        const newPieceIdsSet = new Set(
          (project.pieces ?? []).map((p) => p.id).filter(Boolean),
        );

        const piecesToDelete = existingPieceIds.filter(
          (id) => !newPieceIdsSet.has(id),
        );
        if (piecesToDelete.length) {
          await this.supabase
            .from("orders_pieces")
            .delete()
            .in("id", piecesToDelete);
        }

        for (const piece of project.pieces ?? []) {
          const pieceToUpsert = {
            id: piece.id,
            name: piece.name,
            qtde: piece.qtde,
            measure: piece.measure,
            project_id: projectData.id,
            material_id: piece.material?.id ?? null,
          };

          const { data: pieceData, error: pieceError } = await this.supabase
            .from("orders_pieces")
            .upsert(pieceToUpsert)
            .select()
            .single();
          if (pieceError)
            throw new Error(`Piece upsert error: ${pieceError.message}`);

          if (piece.material) {
            const snapshot = {
              piece_id: pieceData.id,
              measure_type: piece.material.measureType,
              unit: piece.material.unit,
              waste_tax: piece.material.wasteTax,
              base_value: piece.material.baseValue,
              measure: piece.material.measure,
              cut_direction: piece.material.cutDirection,
            };

            const { error: snapshotError } = await this.supabase
              .from("orders_pieces_materials_snapshot")
              .upsert(snapshot, { onConflict: "piece_id" });
            if (snapshotError)
              throw new Error(
                `Snapshot insert error: ${snapshotError.message}`,
              );
          }
        }
      }

      const { data: fullOrder, error: fetchError } = await this.supabase
        .from("orders")
        .select(
          `
        *,
        client:clients(*),
        projects:orders_projects(
          *,
          pieces:orders_pieces(
            *,
            material:materials(id, name, code, description),
            material_snapshot:orders_pieces_materials_snapshot(*)
          )
        )
      `,
        )
        .eq("id", orderData.id)
        .single();
      if (fetchError)
        throw new Error(`Fetch order error: ${fetchError.message}`);

      return mapOrderFromSupabase(fullOrder);
    } catch (err) {
      this.handleError(err, "OrdersService.upsertOrder");
    }
  }

  async getOrders(params?: SearchState): Promise<SearchResult<Order>> {
    try {
      let query = this.supabase.from("orders").select(
        `
      *,
      client:clients(*),
      projects:orders_projects(
        *,
        pieces:orders_pieces(
          *,
          material:materials(id, name, code, description),
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

      const items = (data ?? []).map(mapOrderFromSupabase);
      const totalPages = Math.ceil((count ?? 0) / perPage);

      return { items, page, totalPages };
    } catch (err) {
      this.handleError(err, "OrdersService.getOrders");
    }
  }

  async getOrderById(id: string): Promise<Order | null> {
    try {
      const { data: order, error } = await this.supabase
        .from("orders")
        .select(
          `
        *,
        client:clients(*),
        projects:orders_projects(
          *,
          pieces:orders_pieces(
            *,
            material:materials(id, name, code, description),
            material_snapshot:orders_pieces_materials_snapshot(*)
          )
        )
      `,
        )
        .eq("id", id)
        .single();

      if (error) throw error;

      if (!order) return null;

      return mapOrderFromSupabase(order);
    } catch (err) {
      this.handleError(err, "OrdersService.getOrderById");
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

  async copyOrder(orderId: string): Promise<{ id: string }> {
    try {
      const {
        data: { user },
        error: authError,
      } = await this.supabase.auth.getUser();

      if (authError) throw new Error(authError.message);
      if (!user) throw new Error("User not authenticated");

      const { data: original, error: fetchError } = await this.supabase
        .from("orders")
        .select(
          `
        *,
        client:clients(*),
        projects:orders_projects(
          *,
          pieces:orders_pieces(
            *,
            material_snapshot:orders_pieces_materials_snapshot(*)
          )
        )
      `,
        )
        .eq("id", orderId)
        .single();

      if (fetchError) throw new Error(fetchError.message);
      if (!original) throw new Error("Order not found");

      const {
        id: _oldId,
        client,
        projects,
        created_at,
        updated_at,
        ...orderData
      } = original;

      const { data: newOrder, error: insertOrderError } = await this.supabase
        .from("orders")
        .insert({
          ...orderData,
          name: `(Cópia) ${orderData.name ?? ""}`.trim(),
          code: await generateId(),
          user_id: user.id,
        })
        .select()
        .single();

      if (insertOrderError) throw new Error(insertOrderError.message);

      for (const project of original.projects ?? []) {
        const {
          id: _projectOldId,
          pieces,
          created_at,
          updated_at,
          ...projectData
        } = project;

        const { data: newProject, error: projectError } = await this.supabase
          .from("orders_projects")
          .insert({
            ...projectData,
            order_id: newOrder.id,
          })
          .select()
          .single();

        if (projectError) throw new Error(projectError.message);

        for (const piece of project.pieces ?? []) {
          const {
            id: _pieceOldId,
            material_snapshot,
            created_at,
            updated_at,
            ...pieceData
          } = piece;

          const { data: newPiece, error: pieceError } = await this.supabase
            .from("orders_pieces")
            .insert({
              ...pieceData,
              project_id: newProject.id,
            })
            .select()
            .single();

          if (pieceError) throw new Error(pieceError.message);

          if (material_snapshot) {
            const {
              id: _snapId,
              created_at: _snapCreated,
              updated_at: _snapUpdated,
              ...snapData
            } = material_snapshot;

            const { error: snapshotError } = await this.supabase
              .from("orders_pieces_materials_snapshot")
              .insert({
                ...snapData,
                piece_id: newPiece.id,
              });

            if (snapshotError) throw new Error(snapshotError.message);
          }
        }
      }

      return { id: newOrder.id };
    } catch (err) {
      this.handleError(err, "OrdersService.duplicateOrder");
    }
  }
}
