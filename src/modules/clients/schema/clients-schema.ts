import { z } from "zod";

export const clientSchema = z.object({
  client_id: z.string().optional(),
  client_name: z.string().min(1, "Name is required").trim(),
  client_category: z.enum(["Pessoa física", "Pessoa jurídica"]),

  client_cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Invalid CPF. Example: 123.456.789-00")
    .or(z.literal(""))
    .optional(),

  client_cnpj: z
    .string()
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "Invalid CNPJ. Example: 12.345.678/0001-00")
    .or(z.literal(""))
    .optional(),

  client_phone: z
    .string()
    .regex(
      /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
      "Invalid phone number. Example: (88) 99999-8888 or (88) 8888-8888"
    ),

  client_email: z.string().email("Invalid email"),

  client_city: z.string().min(1, "City is required").trim(),
  client_zipCode: z
    .string()
    .regex(/^\d{5}-\d{3}$/, "Invalid ZIP code. Example: 68300-000"),

  client_neighborhood: z.string().min(1, "Neighborhood is required").trim(),
  client_address: z.string().min(1, "Address is required").trim(),
  client_complement: z.string().optional(),
  client_notes: z.string().optional(),
});

export type ClientInput = z.infer<typeof clientSchema>;
