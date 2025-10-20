"use server";

import { actionClient } from "@/lib/safe-action";
import { signInWithEmail } from "@/modules/auth/supabase-auth-service";
import { loginSchema } from "../_schema/sign-in-schema";

export const signInAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const user = await signInWithEmail(email, password);

    if (!user) {
      throw new Error("Email ou senha inválidos");
    }
    return user;
  });
