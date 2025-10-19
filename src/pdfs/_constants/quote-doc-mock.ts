import { quoteCompanyInfo } from "./mock-data";

const mockClient = {
  name: "Antônio José",
  code: "C38223",
  document: "075.322.111-32",
  phone: "(88) 9 9332 - 6040",
  email: "oi@gmail.com",
  address: {
    street: "Rua Dr Júlio de Carvalho",
    complement: "SN",
    neighborhood: "Centro",
    city: "Viçosa do Ceará",
    cep: "62300000",
  },
};

const mockPayment = {
  initialDate: "30/05/2025",
  paymentMethod: "A combinar",
  advanceAmount: "R$ 432,54",
  deliveryDays: 45,
  remainingPaymentInfo: "A combinar",
  installmentsInfo: "1 X de R$ 805,60 = 805,60",
};

const mockOrder = {
  code: "C29115",
  name: "Orçamento de projeto",
  generationDate: "30/05/2025 10:00",
  expirationDays: 7,
  projects: [
    {
      name: "Bancada de MDF",
      qtde: 1,
      unitPrice: "R$ 2.432,54",
      totalPrice: "R$ 2.432,54",
    },
  ],
  included:
    "Estrutura confeccionada em MDF de alta qualidade, garantindo durabilidade e bom acabamento.",
  excluded: "Espelhos, independentemente do tamanho ou espessura.",
  rawAmount: "R$ 2.432,54",
  discountPercent: 10,
  discountAmount: "R$ -432,54",
  finalAmount: "R$ 1.832,54",
  notes: "A entrega deve ser feita durante o dia e com cuidado na instalação.",
};

export const mockQuoteDocument = {
  company: quoteCompanyInfo,
  client: mockClient,
  order: mockOrder,
  payment: mockPayment,
};
