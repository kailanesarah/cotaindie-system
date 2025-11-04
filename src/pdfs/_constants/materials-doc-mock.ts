const mockClient = {
  name: "Cliente exemplo",
  code: "C38223",
};

const mockReport = {
  quoteCode: "C29115",
  reportCode: "E29115",
  title: "Relatório de materiais e custos",
  generationDate: "30/05/2025 10:30",
  projects: [
    { name: "Bancada de MDF", qtde: 1 },
    { name: "Armários para cozinha", qtde: 1 },
  ],
  usedMaterials: [
    {
      code: "M27212",
      name: "Dobradiça de pressão com pistão",
      intQtde: 1,
      qtde: 1,
      measure: "UN",
      unitPrice: "R$ 432,54",
      total: "R$ 2.432,54",
    },
    {
      code: "M82112",
      name: "Chapa de MDF de alta qualidade",
      intQtde: 4,
      qtde: 3.21,
      measure: "M2",
      unitPrice: "R$ 262,24",
      total: "R$ 1.552,04",
    },
  ],
  materialsTotal: "R$ 2.132,54",
  otherCosts: [
    {
      name: "Montador de móveis",
      qtde: 4,
      value: "R$ 100,00",
      total: "R$ 400,00",
    },
    {
      name: "Auxiliar de montagem",
      qtde: 2,
      value: "R$ 75,00",
      total: "R$ 150,00",
    },
    {
      name: "Frete e manuseio",
      qtde: 1,
      value: "R$ 150,00",
      total: "R$ 150,00",
    },
  ],
  otherCostsTotal: "R$ 700,00",
  notes: "Realizar pedido de materiais com antecedência.",
};

export const materialsDocMock = {
  client: mockClient,
  report: mockReport,
};
