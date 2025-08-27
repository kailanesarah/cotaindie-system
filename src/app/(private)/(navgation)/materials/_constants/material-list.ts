import { categories } from "../../_constants/categories";

export const materials: Material[] = [
  {
    id: "1",
    category: categories[0].id,
    name: "Painel MDF 18mm",
    description:
      "Painel de MDF cru, espessura 18mm, dimensões 275x183cm, ideal para móveis e interiores.",
    measureType: "m2",
    unit: "cm",
    wasteTax: 0.05,
    baseValue: 120,
    measure: [503.25, 44],
  },
  {
    id: "2",
    category: categories[1].id,
    name: "Compensado Naval",
    description:
      "Compensado naval de 12mm, resistente à água, adequado para ambientes úmidos e projetos externos.",
    measureType: "m2",
    unit: "cm",
    wasteTax: 0.05,
    baseValue: 150,
    measure: [400],
  },
  {
    id: "3",
    category: categories[2].id,
    name: "Dobradiça 35mm",
    description:
      "Dobradiça metálica de 35mm para portas e móveis, garantindo abertura suave e durabilidade.",
    measureType: "un",
    unit: "un",
    wasteTax: 0.02,
    baseValue: 5,
    measure: [1],
  },
  {
    id: "4",
    category: categories[3].id,
    name: "Parafuso 4x40mm",
    description:
      "Parafuso zincado 4x40mm, resistente à corrosão, ideal para fixação em madeira.",
    measureType: "un",
    unit: "un",
    wasteTax: 0.02,
    baseValue: 0.5,
    measure: [1],
  },
  {
    id: "5",
    category: categories[4].id,
    name: "Fita de borda PVC",
    description:
      "Fita de borda em PVC branca de 22mm, para acabamento de móveis e painéis.",
    measureType: "ml",
    unit: "cm",
    wasteTax: 0.05,
    baseValue: 1.5,
    measure: [100],
  },
];
