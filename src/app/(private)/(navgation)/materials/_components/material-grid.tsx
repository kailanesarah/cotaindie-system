"use client";

import { useFilterContext } from "../../_context/filter-context";
import { MaterialCard } from "./material-card";

export const ResultGrid = () => {
  const { data: items } = useFilterContext<Material>();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
      {items.map((item, index) => (
        <MaterialCard key={index} material={item} />
      ))}
    </div>
  );
};
