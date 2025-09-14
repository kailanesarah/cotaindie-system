import z from "zod";

const paymentMethod = ["credit", "debit", "bank_transfer", "pix", "others"];

export const orderPaymentSchema = z.object({
  deliveryDays: z
    .number("Adicione os dias até a entrega")
    .positive("O número de dias deve ser positivo"),
  discountPercentage: z
    .number("Insira um desconto")
    .min(0, "O desconto deve ser a partir de zero")
    .max(100, "O desconto não pode ser maior que 100%"),
  discount: z
    .number("Insira um desconto")
    .min(0, "O desconto deve ser a partir de zero"),
  upfrontPaymentMethod: z.enum(paymentMethod, "Escolha uma opção válida"),
  upfrontAmount: z
    .number("Insira um adiantamento")
    .min(0, "O adiantamento deve ser a partir de zero"),
  remainingAmount: z
    .number("Insira o valor restante")
    .min(0, "O valor deve ser a partir de zero"),
  remainingPaymentMethod: z.enum(paymentMethod, "Escolha uma opção válida"),
  remainingInstallmentCount: z
    .string()
    .regex(/^[1-9]\d*$/, "Insira um número positivo válido"),
  notes: z.string("Detalhes sobre o pedido").optional(),
});

export type orderPaymentType = z.infer<typeof orderPaymentSchema>;
