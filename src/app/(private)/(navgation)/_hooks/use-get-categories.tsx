"use client";

import { ToastCard } from "@/components/ui/toast-card";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getCategoriesAction } from "../_actions/get-categories-action";

export function useGetCategories() {
  const query = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategoriesAction,
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
            "Não foi possível buscar as categorias. Tente novamente."
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
