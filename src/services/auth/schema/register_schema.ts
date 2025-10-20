import { z } from "zod";

export const registerSchema = z.object({
  user_name: z
    .string()
    .min(3, { message: "O nome deve ter ao menos 3 caracteres" })
    .max(50, { message: "O nome não pode ultrapassar 50 caracteres" }),
  user_email: z.string().email({ message: "E-mail inválido" }),
  user_password: z
    .string()
    .min(8, { message: "A senha deve ter ao menos 8 caracteres" })
    .max(100, { message: "A senha não pode ultrapassar 100 caracteres" }),
});


export type registerInput = z.infer<typeof registerSchema>;
