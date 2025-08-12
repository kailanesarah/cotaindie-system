import React from "react";
import { requireSession } from "@/modules/auth/auth-utils";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/urls";

const WelcomePage = async () => {

  const session = await requireSession();

  if (!session) {
    redirect(ROUTES.PUBLIC.SIGNIN); 
  }
  redirect(ROUTES.PRIVATE.DASHBOARD);

  return (
    <main className="h-screen flex flex-col justify-center items-center bg-blue-50 px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Bem-vindo(a), você já está logado!
      </h1>
    </main>
  );
};

export default WelcomePage;
