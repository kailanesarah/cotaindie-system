import { requireSession } from "@/modules/auth/auth-utils";
import SignoutButton from "../signout/components/ui/btt-logout";

export default async function WelcomePage() {
  const session = await requireSession();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-xl space-y-6 rounded-xl bg-white p-10 text-center shadow-xl">
        <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
          Bem-vindo(a), {session?.user?.name || "usuário"}!
        </h1>

        <p className="text-lg text-gray-600">
          Obrigado por visitar nossa aplicação. Esperamos que você tenha uma
          ótima experiência!
        </p>

        <div className="pt-6">
          <SignoutButton />
        </div>
      </div>
    </main>
  );
}
