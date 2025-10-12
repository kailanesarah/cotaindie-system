interface Client {
  id: string;
  code?: string;
  name: string;
  notes?: string;
  type: "pf" | "pj";

  document: {
    type: "cpf" | "cnpj";
    value?: string;
  };

  email?: string;
  phone?: string;

  address: {
    street: string;
    complement?: string;
    neighborhood: string;
    city: string;
    cep?: string;
  };
}
