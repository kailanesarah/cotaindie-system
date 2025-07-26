import { getUsersFromSheet } from "@/modules/login/repository";
import { User } from "@/types/user";
import { userSchema } from "@/types/user";

export async function serviceDataGET() {
  try {
    const data = await getUsersFromSheet();
    return data;
  } catch (error) {
    console.error("Erro no serviceDataGET:", error);
    throw error;
  }
}

export async function serviceLogin(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const data_user: any[][] = await getUsersFromSheet();

    const users: User[] = data_user
      .map((row) =>
        userSchema.safeParse({
          id: row[0],
          name: row[1],
          email: row[2],
          password: row[3],
        })
      )
      .filter(
        (result): result is { success: true; data: User } => result.success
      )
      .map((result) => result.data);

    const user = users.find(
      (user) => user.email === email && user.password.trim() === password
    );

    return user || null;
  } catch (error) {
    console.error("Erro ao validar usuário:", error);
    return null;
  }
}
