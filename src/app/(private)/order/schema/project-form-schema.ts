import z from "zod";
import { pieceSchema } from "./piece-form-schema";

export const costSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  qtde: z.number().int().min(1, "Quantidade deve ser pelo menos 1"),
  value: z.number().min(0, "O valor deve a partir de  0"),
});

export type Cost = z.infer<typeof costSchema>;

export const projectSchema = z.object({
  id: z.string().optional(),

  name: z
    .string("Adicione um nome válido")
    .min(2, "Nome deve ter duas ou mais letras"),
  qtde: z.number().positive("Insira um número positivo"),

  costs: z.array(costSchema),
  pieces: z.array(pieceSchema),

  profitRate: z
    .number()
    .min(0, "Insira um número a partir de zero")
    .max(100, "Valor máximo é 100%"),
  monthlyExpense: z
    .number()
    .min(0, "Insira um número a partir de zero")
    .max(100, "Valor máximo é 100%"),
  comission: z
    .number()
    .min(0, "Insira um número a partir de zero")
    .max(100, "Valor máximo é 100%"),

  rawAmount: z.number().optional(), //only visual, in this dialog form
});

export const getProjectDefaultValues = (
  project?: Project,
): z.infer<typeof projectSchema> => {
  return {
    name: project?.name || "",
    qtde: project?.qtde || 1,

    costs: [],
    pieces: project?.pieces || [],

    profitRate: project?.profitRate || 0,
    monthlyExpense: project?.monthlyExpense || 0,
    comission: project?.comission || 0,
  };
};
