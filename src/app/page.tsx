import { ROUTES } from "@/constants/urls";
import { requireSession } from "@/modules/auth/auth-utils";
import { redirect } from "next/navigation";

const WelcomePage = async () => {
  const session = await requireSession();

  if (!session) {
    redirect(ROUTES.PUBLIC.SIGNIN);
  }
  redirect(ROUTES.PRIVATE.DASHBOARD);

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-blue-50 px-4">
      <h1 className="mb-4 text-5xl font-bold text-gray-800">
        Bem-vindo(a), você já está logado!
      </h1>
    </main>
  );
};

export default WelcomePage;
