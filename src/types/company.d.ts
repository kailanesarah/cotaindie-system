interface Company {
  name: string;
  document: string;
  phone: string;
  email: string;
  address: {
    street: string;
    complement?: string;
    neighborhood: string;
    city: string;
    cep?: string;
  };
}
