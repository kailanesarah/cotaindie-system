"use client";

import { SelectFilter } from "../../_components/search-bar";
import { useGetCategories } from "../../_hooks/use-get-categories";

export const SelectCategories = () => {
  const { data: categories } = useGetCategories();

  return <SelectFilter options={categories} />;
};
