import { categories } from "../_constants/categories";

export function getCategoryNameById(id: string): string {
  return categories.find((cat) => cat.id === id)?.name ?? "Desconhecido";
}
