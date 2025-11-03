"use client";

import { ToastCard } from "@/components/ui/toast-card";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { upsertOrderAction } from "../_actions/upsert-order-action";
import { useOrderStore } from "../_stores/order-store";
import { orderSchema, type OrderType } from "../schema/order-schema";

export const useUpsertOrder = () => {
  const queryClient = useQueryClient();
  const { order, triggers, setOrderId } = useOrderStore();

  const { execute: executeAction, isPending } = useAction(upsertOrderAction, {
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });

      const id = res.data.id;
      setOrderId(id);

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

    let allValid = true;

    for (const key of Object.keys(triggers)) {
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

    const dataFormatted = { ...order, client: order?.client?.id };
    const result = orderSchema.safeParse(dataFormatted);

    if (!result.success) {
      console.error(result.error);

      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Dados inválidos!"
          text="Algo está errado, algum dado está inválido."
        />
      ));

      return false;
    }

    const payload: OrderType = result.data;

    executeAction(payload);
  };

  return { execute, isPending };
};
