"use client";

import { ToastCard } from "@/components/ui/toast-card";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { signInAction } from "../_actions/sign-in-action";

export function useSignIn() {
  const { execute, isPending } = useAction(signInAction, {
    onSuccess: () => {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Usuário cadastrado com sucesso!"
          text="Bem-vindo(a) ao Rotas da Ibiapaba! Faça seu login."
        />
      ));
    },
    onError: () => {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Erro ao entrar no sistema!"
          text="Verifique se sua senha ou email estão válidos."
        />
      ));
    },
  });

  return { execute, isPending };
}
