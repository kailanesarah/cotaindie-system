import { z } from "zod";

export const condicoesPagamentoSchema = z.object({
  planoDePagamento: z.string().describe("Plano de pagamento"),
  adiantamento: z.string().describe("Adiantamento"),
  dataDaVenda: z.string().describe("Data da venda"),
  pagamentoDoRestante: z.string().describe("Pagamento do restante"),
  previsaoDeEntrega: z.string().describe("Previsão de entrega"),
  restante: z.string().describe("Restante"),
});

export type CondicoesPagamento = z.infer<typeof condicoesPagamentoSchema>;
