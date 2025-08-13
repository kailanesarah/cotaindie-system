'use server';

import { signOut } from "@/modules/auth/api/auth";
import { redirect } from "next/navigation";
import {ROUTES} from "@/constants/urls";

export async function logout() {
  await signOut({ redirect: false });
  redirect(ROUTES.PUBLIC.SIGNIN);
}
