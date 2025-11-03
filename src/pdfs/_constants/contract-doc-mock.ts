const mockCompany = {
  name: "Paulo César Arruda Aragão",
  document: "23.933.978/0001-07",
  phone: "(88) 9 781 - 5906",
  email: "oi@gmail.com",
  address: {
    street: "Sítio São Paulo",
    complement: "SN",
    neighborhood: "Zona Rural",
    city: "Viçosa do Ceará",
    cep: "62300000",
  },
};

const mockClient = {
  name: "Maria Ivani",
  code: "C38223",
  document: "075.322.111-32",
  phone: "(88) 9 9921 - 3234",
  email: "maria@gmail.com",
  address: {
    street: "Rua do Estádio",
    complement: "221",
    neighborhood: "Centro",
    city: "Tianguá",
    cep: "62520000",
  },
};

export const contractClauses = [
  {
    id: "1",
    text: "A CONTRATADA: Garante que seus móveis são confeccionados com material de primeira linha.",
  },
  {
    id: "1-1",
    text: "Garante a reposição de qualquer item que apresentar defeito de fabricação no prazo máximo de 01 (um) ano da data de entrega do pedido, salvo se o mesmo estiver em falta no mercado ou fora de linha.",
  },
  {
    id: "1-2",
    text: "Em caso de entrega do pedido no prazo estipulado, salvo comunicação prévia de atraso e(sic) CONTRATANTE, e mediante aceite do mesmo, ou falta de condições de montagem por parte do CONTRATANTE, ficando a CONTRATADA isenta de qualquer tipo de multa.",
  },
  {
    id: "1-3",
    text: "Assinará 02 (duas) vias de igual teor ficando com 01 (uma) via.",
  },
  {
    id: "1-4",
    text: "Não se incluem no seu pedido itens como puxadores, espelhos, peças em aço, vidros, e demais itens do campo “MATERIAS EXCLUSOS”, salvo acordo prévio e(sic) com o CONTRATANTE.",
  },
  {
    id: "2",
    text: "A CONTRATANTE: Pagará pelos itens estipulados no pedido N.º 01.633 , não podendo acrescentar mais itens após o fechamento do mesmo.",
  },
  {
    id: "2-1",
    text: "Não poderão cancelar ou adiar pagamentos se a CONTRATADA estiver em dias nos prazos estipulados.",
  },
  {
    id: "2-2",
    text: "Fornecerá planta elétrica e hidráulica (quando solicitado/a) pela CONTRATADA no período de instalações dos móveis.",
  },
  {
    id: "2-3",
    text: "Assinará 02 (duas) vias de igual teor, ficando com 01 (uma) via.",
  },
];

const mockPayment = {
  initialDate: "30/05/2025",
  paymentMethod: "A combinar",
  advanceAmount: "R$ 432,54",
  deliveryDays: 45,
  remainingPaymentInfo: "A combinar",
  installmentsInfo: "1 X de R$ 805,60 = 805,60",
};

const mockContract = {
  quoteCode: "C29115",
  saleCode: "V29115",
  name: "Contrato de venda",
  generationDate: "01/08/2025 10:00",
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
  finalAmount: "R$ 2.132,54",
  clauses: contractClauses,
  signatureDateLocation: "Viçosa do Ceará, 01 de agosto de 2025",
};

export const contractDocMock = {
  company: mockCompany,
  client: mockClient,
  contract: mockContract,
  payment: mockPayment,
};
