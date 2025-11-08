"use client";

import { ToastCard } from "@/components/ui/toast-card";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { copyOrderAction } from "../_actions/copy-order-action";
import { useOrderStore } from "../_stores/order-store";

export const useDuplicateOrder = () => {
  const queryClient = useQueryClient();
  const { setOrderFull } = useOrderStore();

  const { execute: executeAction, isPending } = useAction(copyOrderAction, {
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });

      setOrderFull(res.data);

      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Orçamento duplicado!"
          text="A cópia foi criada com sucesso."
        />
      ));
    },
    onError: (err) => {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Erro ao duplicar!"
          text={err.error?.thrownError?.message || "Não foi possível duplicar."}
        />
      ));
    },
  });

  const duplicate = (orderId: string) => executeAction(orderId);

  return { duplicate, isPending };
};
