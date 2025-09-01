interface Client {
  id: string;
  code: string;
  name: string;
  note: string;
  type: "pf" | "pj";

  document: {
    type: "cpf" | "cnpj";
    value: string;
  };

  email?: string;
  phone?: string;
  details?: string;

  address: {
    street: string;
    complement?: string;
    neighborhood: string;
    city: string;
    cep?: string;
  };
}
