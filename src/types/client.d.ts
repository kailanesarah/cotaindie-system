interface Client {
  id: string;
  code?: string;
  name: string;
  notes?: string;
  type: "CPF" | "CNPJ";

  document?: string;

  email?: string;
  phone?: string;

  cep?: string;
  city: string;
  neighborhood: string;
  street: string;
  complement?: string;
}
