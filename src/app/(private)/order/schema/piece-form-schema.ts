import z from "zod";

export const pieceSchema = z.object({
  name: z.string("Insira um nome"),
  qtde: z.number().min(1, "Insira um número"),
  material: z.string("Escolha um material"),
  baseValue: z.number().min(0, "Insira um valor a partir de zero"),
  measureType: z.enum(["m2", "ml", "un"], {
    message: "Tipo de medida inválido",
  }),
  measure: z.union([
    z.tuple([z.number().positive("Deve ser maior que 0")]),
    z.tuple([
      z.number().positive("Deve ser maior que 0"),
      z.number().positive("Deve ser maior que 0"),
    ]),
  ]),
});

export type orderReferenceType = z.infer<typeof pieceSchema>;

export const getPiecetDefaultValues = () => {
  return {
    name: "",
    qtde: 1,
    baseValue: 0,
  };
};
