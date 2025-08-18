"use server";

import { ROUTES } from "@/constants/urls";
import { auth } from "@/modules/auth/api/auth";
import { redirect } from "next/navigation";

export const onlyUsersAction = async () => {
  const session = await auth();

  if (!session?.user) redirect(ROUTES.PUBLIC.SIGNIN);
};
