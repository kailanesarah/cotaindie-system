interface Material {
  id: string;
  category: string;
  name: string;
  description: string;
  measureType: "m2" | "ml" | "un";
  unit: "cm" | "un";
  wasteTax: number;
  baseValue: number;
  measure: [number] | [number, number];
  cutDirection?: "v" | "vh";
}
