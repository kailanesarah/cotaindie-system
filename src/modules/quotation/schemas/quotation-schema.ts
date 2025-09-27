import z from "zod";

export const QuotationCreateSchema = z.object({
  quo_id: z.string().optional(),
  quo_name: z.string(),
  quo_startDate: z.string(),
  quo_validity: z.string(),
  client_id: z.string(),
  project_ids: z.array(z.string()).optional().default([]),
  product_ids: z.array(z.string()).optional().default([]),
});

export type QuotationCreateInfo = z.infer<typeof QuotationCreateSchema>;
