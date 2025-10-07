"use server";

import { actionClient } from "@/lib/safe-action";
import { signOut } from "@/modules/supabase/supabase-auth-service";
import { redirect } from "next/navigation";

export const signOutAction = actionClient.action(async () => {
  await signOut();
  redirect("/sign-in");
});
