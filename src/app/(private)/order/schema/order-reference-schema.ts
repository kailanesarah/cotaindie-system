import z from "zod";

export const orderReferenceSchema = z.object({
  title: z.string("Insira um título para o orçamento"),
  client: z.string("Escolha o cliente que o orçamento pertence"),
  startsAt: z.date("Insira uma data inicial de validade"),
  endsAt: z.string().regex(/^[1-9]\d*$/, "Insira um número positivo válido"),
});
