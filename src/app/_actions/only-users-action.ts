"use server";

import { ROUTES } from "@/constants/urls";
import { requireSession } from "@/modules/supabase/supabase-auth-service";
import { redirect } from "next/navigation";

export const onlyUsersAction = async () => {
  const session = await requireSession();

  if (!session?.user) {
    redirect(ROUTES.PUBLIC.SIGNIN);
  }

  return session;
};
