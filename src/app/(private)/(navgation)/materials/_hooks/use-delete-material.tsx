"use client";

import { ToastCard } from "@/components/temp/toast-card";
import {} from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { useDialog } from "../../_hooks/use-dialog";
import { deleteMaterialAction } from "../_actions/delete-material-action";

export const useDeleteMaterial = () => {
  const queryClient = useQueryClient();
  const { setOpen } = useDialog();

  const { execute, isPending } = useAction(deleteMaterialAction, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["materials"] });

      setOpen(false);

      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Remoção feita com sucesso!"
          text="Material removido do histórico."
        />
      ));
    },
    onError: (err) => {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Erro ao remover o material!"
          text={err.error.thrownError?.message}
        />
      ));
    },
  });

  return { execute, isPending };
};
