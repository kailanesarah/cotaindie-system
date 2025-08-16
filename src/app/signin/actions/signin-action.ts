"use server";
import { ROUTES } from "@/constants/urls";
import { signIn } from "@/modules/auth/api/auth";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    console.log(error);
  }

  redirect(
    `${ROUTES.PUBLIC.SIGNIN}?error=${encodeURIComponent("Erro no login")}`,
  );
  return;
}
