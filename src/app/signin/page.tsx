import SignInForm from "./components/UI/signin-form";
import { requireSession } from "@/modules/auth/auth-utils";
import { redirect } from "next/navigation";
import LayoutLogin from "./components/layout";

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
    <main className="min-h-screen flex justify-center items-center px-4 py-12 bg-(--color-gray-200)">
      <LayoutLogin />
    </main>
  );
}
