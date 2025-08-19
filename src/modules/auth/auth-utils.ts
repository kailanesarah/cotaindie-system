import { ROUTES } from "@/constants/urls";
import { auth } from "@/modules/auth/api/auth";
import { errorsResponse } from "@/utils/errors-messages";
import { redirect } from "next/navigation";

export async function requireSession({
  redirectIfUnauthenticated = true,
}: { redirectIfUnauthenticated?: boolean } = {}) {
  try {
    const session = await auth();

    if (!session && redirectIfUnauthenticated) {
      redirect(ROUTES.PUBLIC.SIGNIN);
    }

    return session;
  } catch (error: any) {
    console.error("Erro ao verificar sessão:", error);
    throw errorsResponse(500, "Erro interno ao verificar sessão", error);
  }
}
