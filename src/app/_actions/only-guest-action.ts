"use server";

import { ROUTES } from "@/constants/urls";
import { requireSessionServer } from "@/services/auth/supabase-auth-service";
import { redirect } from "next/navigation";

export const onlyGuestAction = async (): Promise<void> => {
  const user = await requireSessionServer();

  // Se houver sessão, redireciona para o dashboard
  if (user) {
    redirect(ROUTES.PRIVATE.DASHBOARD);
  }

  // Se não houver sessão, apenas deixa continuar na página
};
