import z from "zod";

export const paymentMethod = [
  "credit",
  "debit",
  "bank_transfer",
  "pix",
  "others",
  "to_agree",
] as const;

export const orderPaymentSchema = z
  .object({
    deliveryDays: z
      .number("Adicione os dias até a entrega")
      .positive("O número de dias deve ser positivo"),
    discountPercent: z
      .number("Insira um desconto")
      .min(0, "Desconto deve ser a partir de zero")
      .max(100, "Desconto máximo de 100%"),
    discount: z
      .number("Insira um desconto")
      .min(0, "O desconto deve ser a partir de zero"),
    paymentMethod: z.enum(paymentMethod, {
      message: "Escolha uma opção válida",
    }),
    advanceAmount: z
      .number("Insira um adiantamento")
      .min(0, "O adiantamento deve ser a partir de zero"),
    advancePaymentMethod: z.enum(paymentMethod).optional(),
    installmentCount: z
      .number("Insira a quantidade de parcelas")
      .int("O valor deve ser um número inteiro")
      .positive("O valor deve ser maior que zero"),

    notes: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.advanceAmount > 0 && !data.advancePaymentMethod) {
      ctx.addIssue({
        code: "custom",
        message: "Escolha um método de pagamento para o adiantamento",
        path: ["advancePaymentMethod"],
      });
    }
  });

export type orderPaymentType = z.infer<typeof orderPaymentSchema>;
