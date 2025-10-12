import { z } from "zod";

export const empresaInfoSchema = z.object({
  nome: z.string().min(2, "Nome da empresa é obrigatório"),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido"),
  pmf: z.string().optional(),
  ie: z.string().optional(),
  endereco: z.string().min(2, "Endereço obrigatório"),
  cidade: z.string().min(2, "Cidade obrigatória"),
  estado: z.string().length(2, "Estado deve ter 2 letras").toUpperCase(),
  cep: z.string().regex(/^\d{8}$/, "CEP deve conter 8 números"),
  whatsapp: z
    .string()
    .regex(/^\(?\d{2}\)?\s9\s?\d{4}\s?\d{4}$/, "WhatsApp inválido")
    .optional(),
});

export type EmpresaInfo = z.infer<typeof empresaInfoSchema>;
