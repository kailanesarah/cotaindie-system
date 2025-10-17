"use client";

import { ToastCard } from "@/components/ui/toast-card";
import toast from "react-hot-toast";
import { useSearch } from "../../_hooks/use-search";
import { getClientsAction } from "../_actions/get-clients-action";

export function useClientsSearch() {
  const { data, loading, error } = useSearch<Client>({
    name: "clients",
    action: getClientsAction,
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

  return {
    data,
    loading,
    error,
  };
}
