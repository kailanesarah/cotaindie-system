"use client";

import { ToastCard } from "@/components/ui/toast-card";
import {} from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { useDialog } from "../../_hooks/use-dialog";
import { deleteOrderAction } from "../_actions/delete-order-action";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  const { setOpen } = useDialog();

  const { execute, isPending } = useAction(deleteOrderAction, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });

      setOpen(false);

      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Remoção feita com sucesso!"
          text="Orçamento removido do histórico."
        />
      ));
    },
    onError: (err) => {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Erro ao remover o orçamento!"
          text={err.error.thrownError?.message}
        />
      ));
    },
  });

  return { execute, isPending };
};
