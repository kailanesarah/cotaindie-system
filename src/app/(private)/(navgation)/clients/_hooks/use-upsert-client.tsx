"use client";

import { ToastCard } from "@/components/ui/toast-card";
import {} from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { useDialog } from "../../_hooks/use-dialog";
import { upsertClientAction } from "../_actions/upsert-client-action";

export const useUpsertClient = () => {
  const queryClient = useQueryClient();
  const { setOpen } = useDialog();

  const { execute, isPending } = useAction(upsertClientAction, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["clients"] });

      setOpen(false);

      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Informação salva com sucesso!"
          text="Cliente adicionado ou atualizado."
        />
      ));
    },
    onError: (err) => {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Erro ao inserir ou atualizar cliente!"
          text={err.error.thrownError?.message}
        />
      ));
    },
  });

  return { execute, isPending };
};
