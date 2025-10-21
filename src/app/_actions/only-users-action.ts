"use server";

import { ROUTES } from "@/constants/urls";
import { AuthService } from "@/services/auth-services";
import { redirect } from "next/navigation";

export const onlyUsersAction = async () => {
  const data = await AuthService.getUser();

  if (!data) {
    redirect(ROUTES.PUBLIC.SIGNIN);
  }
};
