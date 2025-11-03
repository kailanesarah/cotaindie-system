"use server";

import type { SearchResult } from "@/app/(private)/_types/search-result";
import type { SearchState } from "../../_context/search-provider";
import { clients } from "../_constants/clients";

export async function getClientsAction(
  params: SearchState,
): Promise<SearchResult<Client>> {
  const { text, sort, pagination } = params;

  try {
    const filtered = clients.filter((m) =>
      text.length
        ? text.some((t) => m.name.toLowerCase().includes(t.toLowerCase()))
        : true,
    );

    const sorted =
      sort === "ASC"
        ? filtered.toSorted((a, b) => a.name.localeCompare(b.name))
        : filtered.toSorted((a, b) => b.name.localeCompare(a.name));

    const start = (pagination.page - 1) * pagination.perPage;
    const paged = sorted.slice(start, start + pagination.perPage);

    const totalPages = Math.ceil(filtered.length / pagination.perPage);

    return {
      items: paged,
      totalPages,
      page: pagination.page,
    };
  } catch (err) {
    console.error(err);

    throw new Error("Ocorreu um erro inesperado ao buscar os materiais");
  }
}
