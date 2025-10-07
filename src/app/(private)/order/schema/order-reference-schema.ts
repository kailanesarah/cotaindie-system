import z from "zod";

export const orderReferenceSchema = z.object({
  title: z
    .string("Insira um título para o orçamento")
    .min(2, "Insira um título"),
  client: z.string("Escolha um cliente"),
  startsAt: z.date("Insira uma data inicial"),
  endsAt: z.string().regex(/^[1-9]\d*$/, "Insira um número"),
});

export type orderReferenceType = z.infer<typeof orderReferenceSchema>;
