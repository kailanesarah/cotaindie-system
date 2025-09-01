interface Material {
  id: string;
  category: Category;
  name: string;
  description: string;
  measureType: "m2" | "ml" | "un";
  unit: "cm" | "un";
  wasteTax: number;
  baseValue: number;
  measure: [number] | [number, number];
  cutDirection?: "v" | "vh";
}
