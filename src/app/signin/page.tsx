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
    <main className="flex min-h-screen items-center justify-center bg-(--color-gray-200) px-4 py-12">
      <LayoutLogin />
    </main>
  );
}
