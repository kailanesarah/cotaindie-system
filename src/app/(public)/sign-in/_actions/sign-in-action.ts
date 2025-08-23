"use server";

import { actionClient } from "@/lib/safe-action";
import { signIn } from "@/modules/auth/api/auth";
import { loginSchema } from "../_schema/sign-in-schema";

export const signInAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result) {
      throw new Error("Email ou senha inválidos");
    }
  });
