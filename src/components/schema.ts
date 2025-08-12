import { z } from "zod";
import { ReactNode } from "react";

const buttonPropsSchema = z.object({
  text_button: z.string(),
  type: z.enum(["button", "submit", "reset"]).optional(),
  icon: z.custom<ReactNode>().optional(),
  disabled: z.boolean().optional(),
});

export type ButtonProps = z.infer<typeof buttonPropsSchema>;
