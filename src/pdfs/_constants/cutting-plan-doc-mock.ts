import { CuttingPlan } from "@/lib/cutting-plan";

const mockClient = {
  name: "Cliente exemplo",
  code: "C38223",
};

const optimizerConfigCozinha = {
  sheetW: 275,
  sheetH: 183,
  margin: 1,
  pieceSpacing: 1,
  allowRotate: true,
  wastePercentage: 5,
  items: [
    { name: "Porta de armário", w: 70, h: 45 },
    { name: "Fundo de balcão", w: 120, h: 55 },
    { name: "Prateleira interna", w: 55, h: 45 },
  ],
};

const optimizerConfigCloset = {
  sheetW: 275,
  sheetH: 183,
  margin: 1,
  pieceSpacing: 1,
  allowRotate: true,
  wastePercentage: 4,
  items: [
    { name: "Lateral grande", w: 220, h: 45 },
    { name: "Fundo do armário", w: 200, h: 80 },
    { name: "Prateleira interna", w: 80, h: 45 },
    { name: "Porta do armário", w: 210, h: 40 },
  ],
};

const optimizerConfigPainel = {
  sheetW: 275,
  sheetH: 183,
  margin: 1,
  pieceSpacing: 1,
  allowRotate: true,
  wastePercentage: 6,
  items: [
    { name: "Painel principal", w: 180, h: 120 },
    { name: "Nicho decorativo", w: 60, h: 30 },
    { name: "Base inferior", w: 180, h: 40 },
    { name: "Prateleira flutuante", w: 120, h: 25 },
  ],
};

const planCozinha = new CuttingPlan(optimizerConfigCozinha).calculate({
  includeImages: true,
});
const planCloset = new CuttingPlan(optimizerConfigCloset).calculate({
  includeImages: true,
});
const planPainel = new CuttingPlan(optimizerConfigPainel).calculate({
  includeImages: true,
});

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
          cutDirection: "VH" as "V" | "VH",
          cutDirectionLabel: "Corte: Horizontal e vertical",
          pieces: optimizerConfigCozinha.items.map((piece, i) => ({
            id: `p${i + 1}`,
            label: `- ${piece.name} (${piece.w}x${piece.h} cm)`,
            qtde: 1,
          })),
          sheets: planCozinha.base64Images.map((img, i) => ({
            id: `s${i + 1}`,
            label: `Chapa ${i + 1} (${optimizerConfigCozinha.sheetW}x${optimizerConfigCozinha.sheetH} cm)`,
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
          cutDirection: "VH" as "V" | "VH",
          cutDirectionLabel: "Corte: Horizontal e vertical",
          pieces: optimizerConfigCloset.items.map((piece, i) => ({
            id: `p${i + 4}`,
            label: `- ${piece.name} (${piece.w}x${piece.h} cm)`,
            qtde: 1,
          })),
          sheets: planCloset.base64Images.map((img, i) => ({
            id: `s${i + 3}`,
            label: `Chapa ${i + 3} (${optimizerConfigCloset.sheetW}x${optimizerConfigCloset.sheetH} cm)`,
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
          cutDirection: "VH" as "V" | "VH",
          cutDirectionLabel: "Corte: Horizontal e vertical",
          pieces: optimizerConfigPainel.items.map((piece, i) => ({
            id: `p${i + 8}`,
            label: `- ${piece.name} (${piece.w}x${piece.h} cm)`,
            qtde: 1,
          })),
          sheets: planPainel.base64Images.map((img, i) => ({
            id: `s${i + 6}`,
            label: `Chapa ${i + 6} (${optimizerConfigPainel.sheetW}x${optimizerConfigPainel.sheetH} cm)`,
            imageBase64: img,
          })),
        },
      ],
    },
  ],
  notes: `
    Aproveitamento médio:
    ${(
      ((planCozinha.totalFractionalSheets +
        planCloset.totalFractionalSheets +
        planPainel.totalFractionalSheets) /
        (planCozinha.totalIntegerSheets +
          planCloset.totalIntegerSheets +
          planPainel.totalIntegerSheets)) *
      100
    ).toFixed(2)}%
  `,
};

export const cuttingPlanDocMock = {
  client: mockClient,
  plan: mockPlan,
};
