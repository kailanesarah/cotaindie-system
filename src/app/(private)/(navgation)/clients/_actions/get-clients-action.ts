"use server";

import type { SearchResult } from "@/app/(private)/_types/search-result";
import { supabaseServer } from "@/lib/supabase/server";
import { ClientsService } from "@/services/clients-services";
import type { SearchState } from "../../_context/search-provider";

export async function getClientsAction(
  params: SearchState,
): Promise<SearchResult<Client>> {
  const { text, sort, pagination, extras } = params;

  try {
    const supabase = await supabaseServer();
    const clientsService = new ClientsService(supabase);

    const clients = await clientsService.getClients({
      text,
      sort,
      pagination,
      extras,
    });

    return clients;
  } catch (err) {
    console.error(err);

    throw new Error("Ocorreu um erro inesperado ao buscar os materiais");
  }
}
