import { z } from "zod";

export const condicoesPagamentoSchema = z.object({
  quotation_id: z.string().optional(), //fk
  pag_previsao_de_entrega: z.string().describe("Previsão de entrega"),
  pag_plano_de_pagamento: z.string().describe("Plano de pagamento"),
  pag_adiantamento: z.string().describe("Adiantamento"),
  pag_percentual_de_desconto: z
    .number()
    .min(0)
    .max(100)
    .optional()
    .describe("Percentual de desconto (%)"),
  pag_valor_do_desconto: z
    .number()
    .nonnegative()
    .optional()
    .describe("Valor do desconto"),
  pag_pagamento_principal: z.string().describe("Pagamento principal"),
  pag_pagamento_do_adiantamento: z
    .string()
    .describe("Pagamento do adiantamento"),
  pag_pagamento_do_restante: z.string().describe("Pagamento do restante"),
  pag_parcelas_do_restante: z
    .number()
    .int()
    .positive()
    .optional()
    .describe("Quantidade de parcelas do restante"),
  pag_restante: z.string().describe("Restante"),
  pag_data_da_venda: z.string().describe("Data da venda"),
  pag_observacoes: z.string().optional().describe("Observações"),
});

export type CondicoesPagamento = z.infer<typeof condicoesPagamentoSchema>;
