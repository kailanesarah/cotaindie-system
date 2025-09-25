import { z } from "zod";

export const InformacoesAdicionaisSchema = z.object({
  materiaisInclusos: z.string().optional(),
  materiaisExclusos: z.string().optional(),
  observacoes: z.string().optional(),
  descontoPercentual: z.number().optional(),
  valorDesconto: z.string().optional(),
  valorAPagar: z.string().optional(),
  valorPedido: z.string().optional(),
  total: z.string().optional(),
});

export type InformacoesAdicionais = z.infer<typeof InformacoesAdicionaisSchema>;
