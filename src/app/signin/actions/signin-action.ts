"use server";

import { signIn } from "@/modules/auth/api/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/urls";

export async function login(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  const destination = result?.error
    ? `${ROUTES.PUBLIC.SIGNIN}?error=${encodeURIComponent(result.error)}`
    : ROUTES.PRIVATE.DASHBOARD;

  redirect(destination);
}
