"use client";

import { useSearch } from "../../_hooks/use-seach";
import { materials } from "../_constants/material-list";
import { MaterialCard } from "./material-card";

export const ResultGrid = () => {
  const { data: items } = useSearch<Material[]>({
    action: async (filters) => {
      console.log(filters);

      return materials;
    },
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
      {items?.map((item, index) => (
        <MaterialCard key={index} material={item} />
      ))}
    </div>
  );
};
