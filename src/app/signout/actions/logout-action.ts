"use server";

import { ROUTES } from "@/constants/urls";
import { signOut } from "@/modules/auth/api/auth";
import { redirect } from "next/navigation";

export async function logout() {
  await signOut({ redirect: false });
  redirect(ROUTES.PUBLIC.SIGNIN);
}
