"use server";

import { ROUTES } from "@/constants/urls";
import { requireUserServer } from "@/modules/auth/supabase-auth-service";
import { redirect } from "next/navigation";

export const onlyUsersAction = async () => {
  const user = await requireUserServer();

  if (!user) {
    redirect(ROUTES.PUBLIC.SIGNIN);
  }

  return user;
};
