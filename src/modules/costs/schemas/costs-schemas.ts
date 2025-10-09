import z from "zod";

export const costSchema = z.object({
  cost_id: z.string().optional(),
  cost_name: z.string(),
  cost_quantity: z.number().int(),
  cost_value_uni: z.number(),
  cost_total_value: z.number(),
  project_id: z.string().optional(),
});

export type costInput = z.infer<typeof costSchema>;
