import { errorsResponse } from "@/utils/errors-messages";
import { successResponse } from "@/utils/success-messages";
import { registerSchema, type registerInput } from "./schema/register_schema";
import { createClient } from "./supabase-server";

export async function signInWithEmail(email: string, password: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw errorsResponse(401, "Credenciais inválidas", error.message);
    }

    return successResponse(
      data.user,
      200,
      "auth",
      "Login realizado com sucesso",
    );
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno ao autenticar",
      err.details,
    );
  }
}

export async function signUpWithEmail(data: registerInput) {
  try {
    const supabase = await createClient();

    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
      throw errorsResponse(400, "Dados inválidos", parsed.error.format());
    }

    const { user_name, user_email, user_password } = parsed.data;
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: user_email,
      password: user_password,
    });

    if (authError || !authData.user) {
      throw errorsResponse(400, "Erro ao criar usuário", authError?.message);
    }

    const { error: insertError } = await supabase.from("table_users").insert({
      user_id: authData.user.id,
      user_name,
      user_email: authData.user.email,
      created_at: new Date(),
    });

    if (insertError) {
      throw errorsResponse(
        500,
        "Erro ao salvar dados do usuário",
        insertError.message,
      );
    }

    return successResponse(
      authData,
      201,
      "auth",
      "Usuário registrado com sucesso",
    );
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno ao registrar",
      err.details,
    );
  }
}

export async function signOut() {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw errorsResponse(500, "Erro ao desconectar usuário", error.message);
    }

    return successResponse(null, 200, "Logout realizado com sucesso");
  } catch (err: any) {
    throw errorsResponse(
      err.status || 500,
      err.message || "Erro interno ao desconectar usuário",
      err.details,
    );
  }
}

export async function getAuthenticatedUser(supabase: any) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw errorsResponse(401, "Usuário não autenticado", error?.message);
  }

  return user;
}

export async function requireSession() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    const user = data?.user;

    if (error) {
      throw errorsResponse(500, "Erro ao verificar usuário", {
        message: error.message,
      });
    }

    if (!user) {
      throw errorsResponse(401, "Usuário não autenticado", {});
    }

    return successResponse(user, 200, "Usuário válido");
  } catch (err: any) {
    throw errorsResponse(
      err?.status ?? 500,
      err?.message ?? "Erro interno ao verificar sessão",
      err?.details ?? {},
    );
  }
}
