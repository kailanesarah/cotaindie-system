export async function getAuthenticatedUser(supabase: any) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    throw "Usuário não autenticado";
  }
  return user;
}
