"use server";

import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
import { AuthService } from "@/services/auth-services";

export const logoutAction = actionClient.action(async () => {
  const supabase = await supabaseServer();
  const authService = new AuthService(supabase);

  return await authService.logout();
});
