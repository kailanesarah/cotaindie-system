"use client";

import { ToastCard } from "@/components/ui/toast-card";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getOrderByIdAction } from "../_actions/get-order-by-id-action";

interface IUseGetOrderById {
  id: string;
}

export function useGetOrderById({ id }: IUseGetOrderById) {
  const query = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderByIdAction(id),

    enabled: !!id,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (query.isError && query.error) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title={"Algo deu errado!"}
          text={
            query.error instanceof Error
              ? query.error.message
              : "Não foi possível buscar a ordem. Tente novamente."
          }
        />
      ));
    }
  }, [query.isError, query.error]);

  return {
    data: query.data || null,
    loading: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
