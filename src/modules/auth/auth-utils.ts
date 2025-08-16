import { ROUTES } from "@/constants/urls";
import { auth } from "@/modules/auth/api/auth";
import { redirect } from "next/navigation";

export async function requireSession({
  redirectIfUnauthenticated = true,
}: { redirectIfUnauthenticated?: boolean } = {}) {
  const session = await auth();

  if (!session && redirectIfUnauthenticated) {
    redirect(ROUTES.PUBLIC.SIGNIN);
  }

  return session;
}
