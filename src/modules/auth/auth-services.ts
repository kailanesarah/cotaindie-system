
"use server";

import { errorsResponse } from "@/utils/errors-messages";
import { successResponse } from "@/utils/success-messages";
import z from "zod";
import { getDataService } from "../google-sheets/sheets-services";
import { userSchema } from "./auth-user-schema";

const BASE_SHEET = {
  sheetId: process.env.SHEET_ID!,
  sheetRange: "bd-users!A2:D",
  sheetName: "bd-users",
};

export async function getUserService() {
  try {
    const data = await getDataService(userSchema, BASE_SHEET);
    return successResponse(data, 200);

  } catch (error: any) {

    throw errorsResponse(500, "Erro ao buscar usuários", error);
  }
}


export async function loginService(email: string, password: string) {
  try {
    const data = await getDataService(userSchema, BASE_SHEET);
    console.log("Dados recebidos:", JSON.stringify(data));

    const result = z.array(userSchema).safeParse(data);

    if (!result.success) {
      throw errorsResponse(400, "Dados inválidos");
    }

    const users = result.data;

    const user = users.find(
      u => u.user_email === email && u.user_password.trim() === password.trim()
    );

    if (!user) {
      throw errorsResponse(401, "Credenciais inválidas");
    }

    return successResponse(user, 200);
  } catch (error) {
 
    console.error("Erro no loginService:", error);
    throw errorsResponse(500, "Erro login service", error); 
  }
}
