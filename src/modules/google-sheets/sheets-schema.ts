import { z } from "zod";

export const sheetSchema = z.object({
  sheetId: z.string(),
  sheetRange: z.string(),
  sheetObjectId: z.string().optional(),
  sheetValues: z.array(z.array(z.any())).optional(),
  sheetName: z.string().optional(),
});

export type Sheet = z.infer<typeof sheetSchema>;
