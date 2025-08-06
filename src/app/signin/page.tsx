import SignInForm from "./components/UI/signin-form";
import { requireSession } from "@/modules/auth/auth-utils";
import { redirect } from "next/navigation";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await requireSession({ redirectIfUnauthenticated: false });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Bem-vindo(a) de volta!
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Faça login para acessar sua conta.
          </p>
        </div>

        {/* Formulário de login */}
        <SignInForm />

        <div className="text-center text-sm text-gray-500">
          Ainda não tem uma conta?{" "}
          <button
            className="text-blue-600 hover:underline font-medium transition-colors duration-200"
          >
            Cadastre-se
          </button>
        </div>
      </div>
    </main>
  );
}
