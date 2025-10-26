"use client";

import { ToastCard } from "@/components/ui/toast-card";
import toast from "react-hot-toast";
import { useSearch } from "../../_hooks/use-search";
import { getOrdersAction } from "../_actions/get-orders-action";

export function useOrdersSearch() {
  const { data, loading, error } = useSearch<Order>({
    name: "orders",
    action: getOrdersAction,
    options: {
      onError: (err) => {
        toast((t) => (
          <ToastCard
            id={t.id}
            status="error"
            title={"Algo deu errado!"}
            text={
              err || "Não foi possível concluir a operação. Tente novamente."
            }
          />
        ));
      },
    },
  });
  console.log(data);

  return {
    data,
    loading,
    error,
  };
}
