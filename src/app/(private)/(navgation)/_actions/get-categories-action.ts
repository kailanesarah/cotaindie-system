"use server";

import { categories } from "../_constants/categories";

export async function getCategoriesAction(): Promise<Category[]> {
  try {
    return categories;
  } catch (err) {
    console.error(err);

    throw new Error("Ocorreu um erro inesperado ao buscar as categorias.");
  }
}
