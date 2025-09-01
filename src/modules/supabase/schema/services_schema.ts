import { z } from "zod";

export const EntityOptionsSchema = z.object({
    tableName: z.string(),
    idObject: z.string().optional(),
    idColumnName: z.string(),
    selectFields: z.string().optional(),
});

export type EntityOptionsInput = z.infer<typeof EntityOptionsSchema>;
