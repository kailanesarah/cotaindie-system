"use server";

import { actionClient } from "@/lib/safe-action";
import { signOut } from "@/services/auth/supabase-auth-service";
import { redirect } from "next/navigation";

export const signOutAction = actionClient.action(async () => {
  await signOut();
  redirect("/sign-in");
});
