import { z } from "zod";

// Schema para table_piece
export const pieceSchema = z.object({
  piece_id: z.string().optional(),
  piece_name: z.string(),
  product_current_value: z.number(),
  piece_height: z.number(),
  piece_width: z.number(),
  product_id: z.string(),
  project_id: z.string().optional(),
});

export type pieceInput = z.infer<typeof pieceSchema>;
