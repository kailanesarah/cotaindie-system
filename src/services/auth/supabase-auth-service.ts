// src/modules/supabase/supabase-auth-service.ts
import type { Session, User } from "@supabase/supabase-js";
import { supabaseServer } from "../supabase/server";
import { registerSchema, type registerInput } from "./schema/register_schema";

let cachedUser: User | null = null;
let cachedSession: Session | null = null;

/** Sign in com email e senha */
export async function signInWithEmail(email: string, password: string) {
  try {
    const supabase = await supabaseServer();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(`Credenciais inválidas: ${error.message}`);

    cachedUser = data.user ?? null;
    cachedSession = data.session ?? null;

    return data;
  } catch (err: any) {
    throw new Error(err.message || "Erro interno ao autenticar");
  }
}
/** Sign up com email e senha + salvar dados na tabela + user_metadata */
export async function signUpWithEmail(input: registerInput) {
  try {
    const supabase = await supabaseServer();

    // Validação do input
    const parsed = registerSchema.safeParse(input);
    if (!parsed.success) {
      throw new Error(
        `Dados inválidos: ${JSON.stringify(parsed.error.format())}`,
      );
    }

    const { user_name, user_email, user_password } = parsed.data;

    // Criar usuário no Supabase auth e salvar user_name no metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: user_email,
      password: user_password,
      options: {
        data: {
          user_name, // Salva o nome no user_metadata
        },
      },
    });

    if (authError || !authData.user) {
      throw new Error(`Erro ao criar usuário: ${authError?.message}`);
    }

    // Salvar usuário na tabela customizada
    const { error: insertError } = await supabase.from("users").insert({
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

    // Atualiza cache
    cachedUser = authData.user;
    cachedSession = authData.session ?? null;

    return authData;
  } catch (err: any) {
    throw new Error(err.message || "Erro interno ao registrar");
  }
}

/** Sign out */
export async function signOut() {
  try {
    const supabase = await supabaseServer();
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(`Erro ao desconectar usuário: ${error.message}`);

    cachedUser = null;
    cachedSession = null;

    return { message: "Logout realizado com sucesso" };
  } catch (err: any) {
    throw new Error(err.message || "Erro interno ao desconectar usuário");
  }
}

/** Retorna o usuário autenticado (com cache) */
export async function requireUser(): Promise<User> {
  if (cachedUser) return cachedUser;

  const supabase = await supabaseServer();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user)
    throw new Error(`Usuário não autenticado: ${error?.message}`);

  cachedUser = data.user;
  return cachedUser;
}

/** Retorna o usuário no server (ou null se não existir) */
export async function requireUserServer(): Promise<User | null> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    console.error("Usuário não autenticado:", error?.message);
    return null;
  }

  return data.user;
}

/** Retorna a sessão no server (ou null se não existir) */
export async function requireSessionServer(): Promise<Session | null> {
  const supabase = await supabaseServer();
  const user = await requireUserServer(); // garante que o usuário está autenticado

  if (!user) return null;

  // Como getUser() não retorna a sessão, ainda podemos usar getSession() para pegar os tokens,
  // mas agora sabemos que o usuário é válido
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Erro ao buscar sessão:", error.message);
    return null;
  }

  return data.session ?? null;
}
