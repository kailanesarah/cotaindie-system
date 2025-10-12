import { z } from "zod";

export const informacoesAdicionaisSchema = z.object({
  quotation_id: z.string().optional(),
  info_materiais_inclusos: z.string().optional().describe("Materiais inclusos"),
  info_materiais_exclusos: z
    .string()
    .optional()
    .describe("Materiais não inclusos"),
  info_observacoes_equipe_interna: z
    .string()
    .optional()
    .describe("Observações para a equipe interna"),
});

export type InformacoesAdicionais = z.infer<typeof informacoesAdicionaisSchema>;
