"use client";

import { useRevalidatePaths } from "@/app/(private)/_hooks/use-revalidate";
import { ToastCard } from "@/components/ui/toast-card";
import { ROUTES } from "@/constants/urls";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { useDialog } from "../../_hooks/use-dialog";
import { deleteMaterialAction } from "../_actions/delete-material-action";

export const useDeleteMaterial = () => {
  const queryClient = useQueryClient();
  const { setOpen } = useDialog();
  const { revalidate } = useRevalidatePaths();

  const { execute, isPending } = useAction(deleteMaterialAction, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["materials"],
        exact: false,
      });
      await queryClient.refetchQueries({
        queryKey: ["materials"],
        exact: false,
      });

      setOpen(false);

      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Remoção feita com sucesso!"
          text="Material removido do histórico."
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
          title="Erro ao remover o material!"
          text={message}
        />
      ));
    },
  });

  return { execute, isPending };
};
