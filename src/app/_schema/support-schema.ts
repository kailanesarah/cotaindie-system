import z from "zod";

export const supportSchema = z.object({
  type: z.string().min(2, "Escolha um tipo de assunto"),
  description: z.string().min(2, "Descreva o ocorrido com mais detalhes"),
});

export const supportDefaultValues = {
  type: "",
  description: "",
};
