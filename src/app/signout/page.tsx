import { SignOutForm } from "@/app/signout/components/ui/signout-form";

export default function SignOutPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-gray-100 px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 text-center shadow-xl">
        <h1 className="text-2xl font-semibold text-gray-800">Sair da conta</h1>
        <p className="text-sm text-gray-600">
          Tem certeza que deseja encerrar sua sessão?
        </p>

        <SignOutForm />
      </div>
    </main>
  );
}
