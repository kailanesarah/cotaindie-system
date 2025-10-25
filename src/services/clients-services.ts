import type { SearchState } from "@/app/(private)/(navgation)/_context/search-provider";
import type { SearchResult } from "@/app/(private)/_types/search-result";
import type { SupabaseClient } from "@supabase/supabase-js";
import { BaseService } from "./base-service";

export class ClientsService extends BaseService {
  constructor(supabase: SupabaseClient) {
    super(supabase);
  }

  async createClient(client: Client) {
    try {
      const { data, error } = await this.supabase
        .from("clients")
        .insert(client)
        .select()
        .single();

      if (error) throw error;

      return data as Client;
    } catch (err) {
      this.handleError(err, "ClientsService.createClient");
    }
  }

  async getClients(params?: SearchState): Promise<SearchResult<Client>> {
    try {
      let query = this.supabase.from("clients").select("*", { count: "exact" });

      if (params?.text && params.text.length > 0) {
        const searchableFields = [
          "name",
          "email",
          "phone",
          "code",
          "notes",
          "cep",
          "city",
          "neighborhood",
          "street",
          "complement",
        ];

        const orExpressions = params.text
          .flatMap((t) => searchableFields.map((f) => `${f}.ilike.%${t}%`))
          .join(",");

        query = query.or(orExpressions);
      }

      if (params?.extras && params.extras.length > 0) {
        params.extras.forEach((extra) => {
          query = query.eq(extra.key, extra.value);
        });
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

      const totalPages = Math.ceil((count ?? data?.length ?? 0) / perPage);

      return {
        items: data ?? [],
        page,
        totalPages,
      };
    } catch (err) {
      this.handleError(err, "ClientsService.getClients");
    }
  }

  async getClientById(id: string) {
    try {
      const { data, error } = await this.supabase
        .from("clients")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      return data as Client;
    } catch (err) {
      this.handleError(err, "ClientsService.getClientById");
    }
  }

  async updateClient(id: string, client: Client) {
    const { code, ...partialClient } = client;

    try {
      const { data, error } = await this.supabase
        .from("clients")
        .update(partialClient)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      return data as Client;
    } catch (err) {
      this.handleError(err, "ClientsService.updateClient");
    }
  }

  async deleteClient(id: string): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from("clients")
        .delete()
        .eq("id", id);

      if (error) throw error;

      return true;
    } catch (err) {
      this.handleError(err, "ClientsService.deleteClient");
    }
  }
}
