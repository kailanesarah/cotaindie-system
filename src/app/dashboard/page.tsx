
import { requireSession } from "@/modules/auth/auth-utils";
import SignoutButton from "../signout/components/UI/btt-logout";

export default async function WelcomePage() {
  const session = await requireSession();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-10 max-w-xl w-full text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Bem-vindo(a), {session?.user?.name || "usuário"}!
        </h1>

        <p className="text-gray-600 text-lg">
          Obrigado por visitar nossa aplicação. Esperamos que você tenha uma ótima experiência!
        </p>

        <div className="pt-6">
          <SignoutButton />
        </div>
      </div>
    </main>
  );
}
