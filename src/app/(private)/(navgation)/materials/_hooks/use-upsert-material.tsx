"use client";

import { ToastCard } from "@/components/temp/toast-card";
import {} from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { useDialog } from "../../_hooks/use-dialog";
import { usertMaterialAction } from "../_actions/upsert-material-action";

export const useUpsertMaterial = () => {
  const queryClient = useQueryClient();
  const { setOpen } = useDialog();

  const { execute, isPending } = useAction(usertMaterialAction, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["materials"] });

      setOpen(false);

      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Informação salva com sucesso!"
          text="Material adicionado ou atualizado."
        />
      ));
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
