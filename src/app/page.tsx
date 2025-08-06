import React from "react";
import { requireSession } from "@/modules/auth/auth-utils";

const WelcomePage = async () => {
  const session = await requireSession();

  return (
    <main className="h-screen flex flex-col justify-center items-center bg-blue-50 px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">
        Bem-vindo(a), faça seu login para continuar!
      </h1>
    </main>
  );
};

export default WelcomePage;
