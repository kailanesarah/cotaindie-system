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
      throw new Error(`Credenciais inválidas: ${error.message}`);
    }

    return data.user;
  } catch (err: any) {
    throw new Error(err.message || "Erro interno ao autenticar");
  }
}

export async function signUpWithEmail(data: registerInput) {
  try {
    const supabase = await createClient();

    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Dados inválidos: ${JSON.stringify(parsed.error.format())}`,
      );
    }

    const { user_name, user_email, user_password } = parsed.data;
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: user_email,
      password: user_password,
    });

    if (authError || !authData.user) {
      throw new Error(`Erro ao criar usuário: ${authError?.message}`);
    }

    const { error: insertError } = await supabase.from("table_users").insert({
      user_id: authData.user.id,
      user_name,
      user_email: authData.user.email,
      created_at: new Date(),
    });

    if (insertError) {
      throw new Error(
        `Erro ao salvar dados do usuário: ${insertError.message}`,
      );
    }

    return authData;
  } catch (err: any) {
    throw new Error(err.message || "Erro interno ao registrar");
  }
}

export async function signOut() {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(`Erro ao desconectar usuário: ${error.message}`);
    }

    return { message: "Logout realizado com sucesso" };
  } catch (err: any) {
    throw new Error(err.message || "Erro interno ao desconectar usuário");
  }
}

export async function getAuthenticatedUser(supabase: any) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error(`Usuário não autenticado: ${error?.message}`);
  }

  return user;
}

export async function requireSession() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    const user = data?.user;

    if (error) {
      throw new Error(`Erro ao verificar usuário: ${error.message}`);
    }

    if (!user) {
      throw new Error("Usuário não autenticado");
    }

    return user;
  } catch (err: any) {
    throw new Error(err?.message ?? "Erro interno ao verificar sessão");
  }
}
