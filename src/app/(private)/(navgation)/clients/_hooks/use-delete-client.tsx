"use client";

import { useRevalidatePaths } from "@/app/(private)/_hooks/use-revalidate";
import { ToastCard } from "@/components/ui/toast-card";
import { ROUTES } from "@/constants/urls";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { useDialog } from "../../_hooks/use-dialog";
import { deleteClientAction } from "../_actions/delete-client-action";

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  const { setOpen } = useDialog();
  const { revalidate } = useRevalidatePaths();

  const { execute, isPending } = useAction(deleteClientAction, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["clients"],
        exact: false,
      });
      await queryClient.refetchQueries({
        queryKey: ["clients"],
        exact: false,
      });

      setOpen(false);

      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Remoção feita com sucesso!"
          text="Cliente removido do histórico."
        />
      ));

      await revalidate([ROUTES.PRIVATE.ORDER]);
    },
    onError: (err: any) => {
      const message =
        err?.error?.serverError ||
        err?.error?.thrownError?.message ||
        err?.message ||
        "Ocorreu um erro desconhecido.";

      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Erro ao remover o cliente!"
          text={message}
        />
      ));
    },
  });

  return { execute, isPending };
};
