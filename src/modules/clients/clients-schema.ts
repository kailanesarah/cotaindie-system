import { z } from "zod";

export const clientSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  category: z.enum(["Pessoa física", "Pessoa jurídica"]),
  cpf: z
    .string()
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "Invalid CPF. Example: 123.456.789-00"
    )
    .or(z.literal("")) 
    .optional(),
  cnpj: z
    .string()
    .regex(
      /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
      "Invalid CNPJ. Example: 12.345.678/0001-00"
    )
    .or(z.literal("")) 
    .optional(),
  phone: z
    .string()
    .regex(
      /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
      "Invalid phone number. Example: (88) 99999-8888 or (88) 8888-8888"
    ),
  email: z.email("Invalid email"),
  city: z.string().min(1, "City is required"),
  zipCode: z
    .string()
    .regex(/^\d{5}-\d{3}$/, "Invalid ZIP code. Example: 68300-000"),
  neighborhood: z.string().min(1, "Neighborhood is required"),
  address: z.string().min(1, "Address is required"),
  complement: z.string().optional(),
  notes: z.string().optional(),
});


export type ClientInput = z.infer<typeof clientSchema>;
