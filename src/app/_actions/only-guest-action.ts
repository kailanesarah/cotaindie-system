"use server";

import { ROUTES } from "@/constants/urls";
import { requireSession } from "@/modules/supabase/supabase-auth-service";
import { redirect } from "next/navigation";

export const onlyGuestAction = async (): Promise<void> => {
  const session = await requireSession();

  if (session) {
    redirect(ROUTES.PRIVATE.DASHBOARD);
  }
};
