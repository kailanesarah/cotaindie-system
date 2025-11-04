"use server";

import { actionClient } from "@/lib/safe-action";
import { supabaseServer } from "@/lib/supabase/server";
import { AuthService } from "@/services/auth-services";
import { loginSchema } from "../_schema/sign-in-schema";

export const loginAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await supabaseServer();
    const authService = new AuthService(supabase);

    const user = await authService.login(email, password);

    if (!user) {
      throw new Error("Email ou senha inválidos");
    }

    return user;
  });
