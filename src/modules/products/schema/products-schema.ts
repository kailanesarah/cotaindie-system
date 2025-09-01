import { z } from "zod";

export const productSchema = z.object({
  // Identificação
  product_id: z.string().optional(),

  // Informações básicas
  product_name: z.string()
    .min(1, "Product name is required")
    .trim(),
  product_description: z.string()
    .min(1, "Product description is required")
    .trim(),
  product_category: z.string().min(1).trim(),

  // Tipo de medida
  product_measurements: z.enum([
    "Metro linear (m ou m² linear)",
    "Metro quadrado (m²)",
    "Unidade (un ou peça)"
  ]),

  // Dimensões (em metros ou unidade conforme o tipo de medida)
  product_height: z.number().positive().optional(),
  product_width: z.number().positive().optional(),

  // Preço e desperdício
  product_price: z.number()
    .positive()
    .max(1000, "Price cannot exceed 1000"),
  product_waste_rate: z.number()
    .min(0, "Waste rate cannot be negative")
    .max(100, "Waste rate cannot exceed 100"),
});


export type ProductInput = z.infer<typeof productSchema>;