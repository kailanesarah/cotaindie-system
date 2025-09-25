"use client";

import { ToastCard } from "@/components/ui/toast-card";
import toast from "react-hot-toast";
import { useOrderStore } from "../_stores/order-store";

export function useSaveOrder() {
  const { order, triggers } = useOrderStore();

  const execute = async () => {
    const triggerKeys = Object.keys(triggers);

    console.log(triggerKeys);

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
      if (!isValid) {
        allValid = false;
      }
    }

    if (allValid) {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Dados salvo com suscesso!"
          text="Todas as mudanças estão salvas."
        />
      ));
      console.log("Forms are valid: ", order);
      return true;
    } else {
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
  };

  return { execute };
}
