"use client";

import { ToastCard } from "@/components/ui/toast-card";
import {} from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { useDialog } from "../../_hooks/use-dialog";
import { deleteClientAction } from "../_actions/delete-client-action";

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  const { setOpen } = useDialog();

  const { execute, isPending } = useAction(deleteClientAction, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["clients"] });

      setOpen(false);

      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Remoção feita com sucesso!"
          text="Cliente removido do histórico."
        />
      ));
    },
    onError: (err) => {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Erro ao remover o cliente!"
          text={err.error.thrownError?.message}
        />
      ));
    },
  });

  return { execute, isPending };
};
