import { errorsResponse } from "@/utils/errors-messages";
import { successResponse } from "@/utils/success-messages";
import { getSheetDataService } from "../google-sheets/sheets-service";
import { type User, userSchema } from "./auth-user";

const BASE_SHEET = {
  sheetId: process.env.SHEET_ID!,
  sheetRange: "bd-users!A2:D",
  sheetName: "bd-users",
};

export async function getUserService() {
  try {
    const data = await getSheetDataService(BASE_SHEET);
    const users: User[] = data
      .map((row) =>
        userSchema.safeParse({
          user_id: row[0],
          user_name: row[1],
          user_email: row[2],
          user_password: row[3],
        })
      )
      .filter(
        (result): result is { success: true; data: User } => result.success
      )
      .map((result) => result.data);

    return successResponse(users, 200);
  } catch (error: any) {
    throw errorsResponse(500, "Erro ao buscar usuários", error);
  }
}

export async function loginService(email: string, password: string) {
  try {
    const data_user: any[][] = await getSheetDataService(BASE_SHEET);

    const users: User[] = data_user
      .map((row) =>
        userSchema.safeParse({
          user_id: row[0],
          user_name: row[1],
          user_email: row[2],
          user_password: row[3],
        })
      )
      .filter(
        (result): result is { success: true; data: User } => result.success
      )
      .map((result) => result.data);

    const user = users.find(
      (u) => u.user_email === email && u.user_password.trim() === password
    );

    if (!user) {
      throw errorsResponse(401, "Credenciais inválidas");
    }

    return successResponse(user, 200);
  } catch (error: any) {
    throw errorsResponse(500, "Erro interno ao validar login", error);
  }
}
