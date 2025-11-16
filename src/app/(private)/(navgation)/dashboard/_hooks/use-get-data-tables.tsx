"use client";

import { ToastCard } from "@/components/ui/toast-card";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getDataTablesAction } from "../_actions/get-data-tables-action";
import type { DataTables } from "../_types/data-tables";

export function useGetDataTables() {
  const query = useQuery<DataTables>({
    queryKey: ["data-tables"],
    queryFn: getDataTablesAction,
  });

  useEffect(() => {
    if (query.isError && query.error) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Algo deu errado!"
          text={
            query.error.message ||
            "Não foi possível buscar os dados de vendas. Tente novamente."
          }
        />
      ));
    }
  }, [query.isError, query.error]);

  return {
    data: query.data || {},
    loading: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
