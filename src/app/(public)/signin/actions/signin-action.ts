"use server";

import { signIn } from "@/modules/auth/api/auth";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    redirect(`/signin?error=${result.error}`);
  }

  redirect("/dashboard");
}
