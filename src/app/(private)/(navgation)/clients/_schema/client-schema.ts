import z from "zod";

export const clientSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome obrigatório"),
  category: z.enum(["pf", "pj"], { message: "Categoria obrigatória" }),

  document: z.object({
    type: z.enum(["cpf", "cnpj"], { message: "Tipo de documento obrigatório" }),
    value: z
      .string()
      .min(1, "Número do documento obrigatório")
      .optional()
      .or(z.literal("")),
  }),

  email: z
    .string()
    .email("Digite um email válido")
    .optional()
    .or(z.literal("")),
  phone: z.string().min(10, "Digite o número de telefone"),
  details: z.string().optional(),
  address: z.object({
    street: z.string().min(1, "Digite o nome do endereço"),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, "Digite o nome do bairro"),
    city: z.string().min(1, "Digite o nome da cidade"),
    cep: z.string("Digite um CEP válido").optional(),
  }),
});

export function getClientDefaultValues(
  client?: Partial<Client>,
): z.infer<typeof clientSchema> {
  return {
    id: client?.id ?? "",
    name: client?.name ?? "",
    category: client?.type ?? "pf",

    document: {
      type: client?.document?.type ?? "cpf",
      value: client?.document?.value ?? "",
    },

    email: client?.email ?? "",
    phone: client?.phone ?? "",
    details: client?.details ?? "",

    address: {
      street: client?.address?.street ?? "",
      complement: client?.address?.complement ?? "",
      neighborhood: client?.address?.neighborhood ?? "",
      city: client?.address?.city ?? "",
      cep: client?.address?.cep ?? "",
    },
  };
}

export interface IClientDialog {
  client?: z.infer<typeof clientSchema>;
}
