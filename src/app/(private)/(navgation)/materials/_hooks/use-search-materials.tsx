"use client";

import { ToastCard } from "@/components/temp/toast-card";
import toast from "react-hot-toast";
import { useSearch } from "../../_hooks/use-search";
import { getMaterialsAction } from "../_actions/get-materials-action";

export function useMaterialsSearch() {
  const { data, loading, error } = useSearch<Material>({
    name: "materials",
    action: getMaterialsAction,
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
