"use client";

import { ToastCard } from "@/components/ui/toast-card";
import {} from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { useDialog } from "../../_hooks/use-dialog";
import { copyOrderAction } from "../_actions/copy-order-action";

export const useCopyOrder = () => {
  const queryClient = useQueryClient();
  const { setOpen } = useDialog();

  const { execute, isPending } = useAction(copyOrderAction, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });

      setOpen(false);

      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Cópia feita com sucesso!"
          text="Orçamento copiado e salvo no histórico."
        />
      ));
    },
    onError: (err) => {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Erro ao fazer cópia do orçamento!"
          text={err.error.thrownError?.message}
        />
      ));
    },
  });

  return { execute, isPending };
};
