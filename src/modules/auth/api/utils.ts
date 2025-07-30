import { auth } from "@/modules/auth/api/auth";
import { redirect } from "next/navigation";

/**
 * Retorna a sessão, e redireciona para /signin caso `redirectIfUnauthenticated` seja true.
 */
export async function requireSession({
  redirectIfUnauthenticated = true,
}: { redirectIfUnauthenticated?: boolean } = {}) {
  const session = await auth();

  if (!session && redirectIfUnauthenticated) {
    redirect("/signin");
  }

  return session;
}
