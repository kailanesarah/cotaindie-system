import z from "zod";

export const projectSchema = z.object({
  project_id: z.string().min(1).optional(),
  project_name: z.string().min(1),
  client_id: z.string().min(1),
  project_status: z.string().min(1),
  project_quantity: z.coerce.number().int(),
  project_profit_margin: z.coerce.number(),
  project_allocated_monthly: z.coerce.number(),
  project_commission_amount: z.coerce.number(),
});

export type projectInput = z.infer<typeof projectSchema>;
