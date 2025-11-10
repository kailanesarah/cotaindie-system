"use client";

import { useRevalidatePaths } from "@/app/(private)/_hooks/use-revalidate";
import { ToastCard } from "@/components/ui/toast-card";
import { ROUTES } from "@/constants/urls";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { useDialog } from "../../_hooks/use-dialog";
import { usertMaterialAction } from "../_actions/upsert-material-action";

export const useUpsertMaterial = () => {
  const queryClient = useQueryClient();
  const { setOpen } = useDialog();
  const { revalidate } = useRevalidatePaths();

  const { execute, isPending } = useAction(usertMaterialAction, {
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
          title="Informação salva com sucesso!"
          text="Material adicionado ou atualizado."
        />
      ));

      await revalidate([ROUTES.PRIVATE.ORDER]);
    },
    onError: (err) => {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Erro ao inserir ou atualizar material!"
          text={err.error.thrownError?.message}
        />
      ));
    },
  });

  return { execute, isPending };
};
