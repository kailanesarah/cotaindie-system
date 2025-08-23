"use client";

import { ToastCard } from "@/components/ui/toast-card";
import { ROUTES } from "@/constants/urls";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOutAction } from "../_actions/sign-out-action";

export function useSignOut() {
  const router = useRouter();

  const { execute, isPending } = useAction(signOutAction, {
    onSuccess: () => {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="success"
          title="Sessão encerrada com sucesso!"
          text="Você precisará logar novamente para acessar."
        />
      ));

      router.push(ROUTES.PUBLIC.SIGNIN);
    },
    onError: () => {
      toast((t) => (
        <ToastCard
          id={t.id}
          status="error"
          title="Erro ao sair do sistema!"
          text="Verifique se você já está deslogado."
        />
      ));
    },
  });

  return { execute, isPending };
}
