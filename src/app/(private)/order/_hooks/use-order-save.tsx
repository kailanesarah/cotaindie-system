"use client";

import { ToastCard } from "@/components/ui/toast-card";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { upsertOrderAction } from "../_actions/upsert-order-action";
import { useOrderStore } from "../_stores/order-store";

export const upseUpsertOrder = () => {
  const queryClient = useQueryClient();
  const { order, triggers } = useOrderStore();

  const { execute: executeAction, isPending } = useAction(upsertOrderAction, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Informação salva com sucesso!"
          text="Orçamento adicionado ou atualizado."
        />
      ));
    },
    onError: (err) => {
      console.log(err);

      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Erro ao inserir ou atualizar o orçamento!"
          text={err.error?.thrownError?.message || "Ocorreu um erro."}
        />
      ));
    },
  });

  const execute = async () => {
    if (!order.projects || order.projects.length === 0) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="warning"
          title="Nenhum projeto adicionado!"
          text="Adicione ao menos um projeto antes de salvar."
        />
      ));
      return false;
    }

    const triggerKeys = Object.keys(triggers);
    if (triggerKeys.length === 0) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="warning"
          title="Preencha todos os dados!"
          text="Alguns campos obrigatórios ainda não foram preenchidos."
        />
      ));
      return false;
    }

    let allValid = true;

    for (const key of triggerKeys) {
      const trigger = triggers[key];
      if (!trigger) continue;

      const isValid = await trigger();
      if (!isValid) allValid = false;
    }

    if (!allValid) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="warning"
          title="Preencha todos os dados!"
          text="Alguns campos obrigatórios ainda não foram preenchidos."
        />
      ));
      return false;
    }

    executeAction(order as Order);

    return true;
  };

  return { execute, isPending };
};
