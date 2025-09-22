import z from "zod";

export const pieceSchema = z
  .object({
    name: z.string("Insira um nome"),
    qtde: z.number().min(1, "Insira um número"),
    material: z.object({
      name: z.string("Escolha um material"),
      measure: z.union([
        z.tuple([z.number().positive("Deve ser maior que 0")]),
        z.tuple([
          z.number().positive("Deve ser maior que 0"),
          z.number().positive("Deve ser maior que 0"),
        ]),
      ]),
      baseValue: z.number().min(0, "Insira um valor a partir de zero"),
      measureType: z.enum(["m2", "ml", "un"], {
        message: "Tipo de medida inválido",
      }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.material.measureType !== "un" && !data.name) {
      ctx.addIssue({
        path: ["name"],
        code: "custom",
        message: "Insira o nome da peça",
      });
    }
  });

export type orderReferenceType = z.infer<typeof pieceSchema>;

export const getPiecetDefaultValues = () => {
  return {
    name: "",
    qtde: 1,
    material: {
      baseValue: 0,
    },
  };
};
