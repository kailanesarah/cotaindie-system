import { SignOutForm } from "@/app/signout/components/UI/signout-form";

export default function SignOutPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-gray-100 px-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Sair da conta
        </h1>
        <p className="text-gray-600 text-sm">
          Tem certeza que deseja encerrar sua sessão?
        </p>

        <SignOutForm />
      </div>
    </main>
  );
}
