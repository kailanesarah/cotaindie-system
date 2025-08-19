"use server";

import { actionClient } from "@/lib/safe-action";
import { signOut } from "@/modules/auth/api/auth";

export const signOutAction = actionClient.action(async () => {
  await signOut({ redirect: false });
});
