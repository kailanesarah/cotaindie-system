import { CuttingPlan } from "@/lib/cutting-plan";

const mockClient = {
  name: "Cliente exemplo",
  code: "C38223",
};

const optimizerConfig = {
  sheetW: 275,
  sheetH: 183,
  margin: 1,
  pieceSpacing: 1,
  allowRotate: true,
  wastePercentage: 5,
  items: [
    { name: "Porta de correr", w: 80, h: 32 },
    { name: "Porta de correr", w: 80, h: 32 },
    { name: "Prateleira simples", w: 16, h: 32 },
  ],
};

const planInstance = new CuttingPlan(optimizerConfig);
const planResults = planInstance.calculate({ includeImages: true });

const mockPlan = {
  quoteCode: "C29115",
  planCode: "P29115",
  title: "Plano de corte automático",
  generationDate: new Date().toLocaleString("pt-BR"),
  projects: [
    {
      id: "proj1",
      name: "Móveis da cozinha",
      qtde: 1,
      materials: [
        {
          id: "mat1",
          name: "MDF Branco 18MM",
          code: "M28321",
          cutDirection: "vh" as "v" | "vh",
          cutDirectionLabel: "Corte: Horizontal e vertical",
          pieces: optimizerConfig.items.map((piece, i) => ({
            id: `p${i + 1}`,
            label: `- ${piece.name} (${piece.w}x${piece.h} cm)`,
            qtde: 1,
          })),
          sheets: planResults.base64Images.map((img, i) => ({
            id: `s${i + 1}`,
            label: `Chapa ${i + 1} (${optimizerConfig.sheetW}x${optimizerConfig.sheetH} cm)`,
            imageBase64: img,
          })),
        },
      ],
    },
    {
      id: "proj2",
      name: "Closet do quarto",
      qtde: 1,
      materials: [
        {
          id: "mat2",
          name: "MDF Carvalho 18MM",
          code: "M28322",
          cutDirection: "v" as "v" | "vh",
          cutDirectionLabel: "Corte: Vertical",
          pieces: [
            { id: "p4", label: "- Lateral grande (220x45 cm)", qtde: 2 },
            { id: "p5", label: "- Fundo do armário (200x80 cm)", qtde: 1 },
            { id: "p6", label: "- Prateleira interna (80x45 cm)", qtde: 4 },
          ],
          sheets: planResults.base64Images.map((img, i) => ({
            id: `s${i + 3}`,
            label: `Chapa ${i + 3} (${optimizerConfig.sheetW}x${optimizerConfig.sheetH} cm)`,
            imageBase64: img,
          })),
        },
      ],
    },
    {
      id: "proj3",
      name: "Painel da sala",
      qtde: 1,
      materials: [
        {
          id: "mat3",
          name: "MDF Amadeirado 15MM",
          code: "M28323",
          cutDirection: "vh" as "v" | "vh",
          cutDirectionLabel: "Corte: Horizontal e vertical",
          pieces: [
            { id: "p7", label: "- Painel principal (180x120 cm)", qtde: 1 },
            { id: "p8", label: "- Nicho decorativo (60x30 cm)", qtde: 2 },
          ],
          sheets: planResults.base64Images.map((img, i) => ({
            id: `s${i + 5}`,
            label: `Chapa ${i + 5} (${optimizerConfig.sheetW}x${optimizerConfig.sheetH} cm)`,
            imageBase64: img,
          })),
        },
      ],
    },
  ],
  notes: `Aproveitamento total: ${(
    (planResults.totalFractionalSheets / planResults.totalIntegerSheets) *
    100
  ).toFixed(2)}%`,
};

export const cuttingPlanDocMock = {
  client: mockClient,
  plan: mockPlan,
};
