import { z } from "zod";

export const categorySchema = z.object({
    category_name: z
        .string({ message: "O nome da categoria deve ser uma string" })
        .min(2, "O nome da categoria deve ter pelo menos 2 caracteres")
        .max(80, "O nome da categoria não pode ter mais de 80 caracteres")
        .trim(),
});

export type CategoryInput = z.infer<typeof categorySchema>;