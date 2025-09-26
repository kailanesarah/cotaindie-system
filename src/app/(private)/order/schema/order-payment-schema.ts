import z from "zod";

const paymentMethod = ["credit", "debit", "bank_transfer", "pix", "others"];

export const orderPaymentSchema = z.object({
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
  paymentMethod: z.enum(paymentMethod, "Escolha uma opção válida"),
  advanceAmount: z
    .number("Insira um adiantamento")
    .min(0, "O adiantamento deve ser a partir de zero"),
  advancePaymentMethod: z.enum(paymentMethod, "Escolha uma opção válida"),
  installmentCount: z
    .string()
    .regex(/^[1-9]\d*$/, "Insira um número positivo válido"),
  notes: z.string("Detalhes sobre o pedido").optional(),
});

export type orderPaymentType = z.infer<typeof orderPaymentSchema>;
