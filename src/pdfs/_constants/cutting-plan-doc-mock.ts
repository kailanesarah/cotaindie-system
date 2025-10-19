const mockClient = {
  name: "Cliente exemplo",
  code: "C38223",
};

const mockPlan = {
  quoteCode: "C29115",
  planCode: "P29115",
  title: "Plano de corte",
  generationDate: "30/05/2025 11:00",
  projects: [
    {
      id: "proj1",
      name: "Móveis da cozinha",
      qtde: 2,
      materials: [
        {
          id: "mat1",
          name: "MDF Branco 18MM",
          code: "M28321",
          cutDirection: "vh" as "v" | "vh",
          cutDirectionLabel: "Corte: Horizontal e vertical",
          pieces: [
            {
              id: "p1",
              label: "- Porta de correr ( Altura: 32cm, Largura 25cm)",
              qtde: 2,
            },
            {
              id: "p2",
              label:
                "- Prateleira simples (MDF Beige - Altura: 32cm, Largura 16cm)",
              qtde: 1,
            },
          ],
          sheets: [
            {
              id: "s1",
              label: "Chapa 1 (2.75x1.83 m)",
              imageBase64:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
            },
          ],
        },
      ],
    },
  ],
  notes: "Realizar pedido de materiais com antecedência.",
};

export const cuttingPlanDocMock = {
  client: mockClient,
  plan: mockPlan,
};
