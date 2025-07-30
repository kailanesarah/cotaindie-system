// app/actions/logout.ts
'use server';

import { signOut } from "@/modules/auth/api/auth";
import { redirect } from "next/navigation";

export async function logout() {
  await signOut({ redirect: false });
  redirect("/signin");
}
