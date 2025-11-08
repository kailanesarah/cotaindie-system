"use client";

import { ToastCard } from "@/components/temp/toast-card";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getClientsAction } from "../_actions/get-clients-action";

export function useGetClients() {
  const query = useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: getClientsAction,
  });

  useEffect(() => {
    if (query.isError && query.error) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title={"Algo deu errado!"}
          text={
            query.error.message ||
            "Não foi possível buscar os clientes. Tente novamente."
          }
        />
      ));
    }
  }, [query.isError, query.error]);

  return {
    data: query.data || [],
    loading: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
