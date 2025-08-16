import { usersFromSheetRepository } from "@/modules/auth/auth-repository";
import { type User, userSchema } from "@/types/user";

export async function dataGETService() {
  try {
    const data = await usersFromSheetRepository();
    return data;
  } catch (error) {
    console.error("Erro no serviceDataGET:", error);
    throw error;
  }
}

export async function loginService(
  email: string,
  password: string,
): Promise<User | null> {
  try {
    const data_user: any[][] = await usersFromSheetRepository();

    const users: User[] = data_user
      .map((row) =>
        userSchema.safeParse({
          id: row[0],
          username: row[1],
          email: row[2],
          password: row[3],
        }),
      )
      .filter(
        (result): result is { success: true; data: User } => result.success,
      )
      .map((result) => result.data);

    const user = users.find(
      (user) => user.email === email && user.password.trim() === password,
    );

    return user || null;
  } catch (error) {
    console.error("Erro ao validar usuário:", error);
    return null;
  }
}
