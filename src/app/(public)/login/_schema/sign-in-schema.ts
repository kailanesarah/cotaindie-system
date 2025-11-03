import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Insira um email válido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const loginDefaultValues = {
  email: "",
  password: "",
};
