"use client";

import { useSearch } from "../../_hooks/use-seach";
import { materials } from "../_constants/material-list";
import { MaterialCard } from "./material-card";

export const ResultGrid = () => {
  const { data: items, loading } = useSearch<Material>({
    action: async (filters) => {
      console.log("Filtros recebidos:", filters);
      return {
        items: materials,
        totalPages: 2,
        page: 2,
      };
    },
  });

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
      {items?.map((item, index) => (
        <MaterialCard key={index} material={item} />
      ))}
    </div>
  );
};
