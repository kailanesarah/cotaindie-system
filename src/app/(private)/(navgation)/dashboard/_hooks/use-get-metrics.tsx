"use client";

import { ToastCard } from "@/components/ui/toast-card";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getMetricsAction } from "../_actions/get-metrics-action";
import type { Metrics } from "../_types/metrics";

export function useGetMetrics() {
  const query = useQuery<Metrics>({
    queryKey: ["metrics"],
    queryFn: getMetricsAction,
    refetchInterval: 600_000,
    refetchIntervalInBackground: true,
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
            "Não foi possível buscar as métricas. Tente novamente."
          }
        />
      ));
    }
  }, [query.isError, query.error]);

  return {
    data: (query.data as Metrics) || {},
    loading: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}
