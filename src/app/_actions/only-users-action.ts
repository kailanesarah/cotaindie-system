"use server";

import { ROUTES } from "@/constants/urls";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const onlyUsersAction = async () => {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect(ROUTES.PUBLIC.LOGIN);
  }
};
