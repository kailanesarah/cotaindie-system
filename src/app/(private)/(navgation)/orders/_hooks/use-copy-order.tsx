"use client";

import { useRevalidatePaths } from "@/app/(private)/_hooks/use-revalidate";
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
  const { revalidate } = useRevalidatePaths();

  const { execute, isPending } = useAction(copyOrderAction, {
    onExecute: () => {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="info"
          title="Copiando orçamento..."
          text="Uma nova aba será aberta com o orçamento copiado."
        />
      ));
    },
    onSuccess: async (result) => {
      const newId = result.data?.id;
      if (!newId) return;

      await queryClient.invalidateQueries({
        queryKey: ["orders"],
        exact: false,
      });
      await queryClient.refetchQueries({
        queryKey: ["orders"],
        exact: false,
      });

      await queryClient.invalidateQueries({
        queryKey: ["data-tables"],
        exact: false,
      });
      await queryClient.refetchQueries({
        queryKey: ["data-tables"],
        exact: false,
      });

      await queryClient.invalidateQueries({
        queryKey: ["metrics"],
        exact: false,
      });
      await queryClient.refetchQueries({
        queryKey: ["metrics"],
        exact: false,
      });

      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Cópia feita com sucesso!"
          text="Orçamento copiado e salvo no histórico."
        />
      ));

      toast((t) => (
        <ToastCard
          id={t.id}
          status="info"
          title="Abrindo orçamento copiado..."
          text="Seu orçamento foi copiado e aparecerá em uma nova aba."
        />
      ));

      setOpen(false);
      await revalidate([ROUTES.PRIVATE.ORDERS, ROUTES.PRIVATE.DASHBOARD]);
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
