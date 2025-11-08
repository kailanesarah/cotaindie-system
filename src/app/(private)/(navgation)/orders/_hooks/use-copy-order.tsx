"use client";

import { copyOrderAction } from "@/app/(private)/order/_actions/copy-order-action";
import { ToastCard } from "@/components/ui/toast-card";
import { ROUTES } from "@/constants/urls";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { useDialog } from "../../_hooks/use-dialog";

export const useCopyOrder = () => {
  const queryClient = useQueryClient();
  const { setOpen } = useDialog();

  const { execute, isPending } = useAction(copyOrderAction, {
    onSuccess: async (result) => {
      const newId = result.data?.id;
      if (!newId) return;

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

      window.open(`${ROUTES.PRIVATE.ORDER_ID}/${newId}`, "_blank");
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
