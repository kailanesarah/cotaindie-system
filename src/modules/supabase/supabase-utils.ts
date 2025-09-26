import { errorsResponse } from "@/utils/errors-messages";

export async function getAuthenticatedUser(supabase: any) {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
        throw errorsResponse(401, "Usuário não autenticado");
    }
    return user;
}