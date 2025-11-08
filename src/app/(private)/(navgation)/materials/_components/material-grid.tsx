"use client";

import type { SearchResult } from "@/app/(private)/_types/search-result";
import { MaterialCard } from "./material-card";

export const ResultGrid = ({
  data,
}: {
  data: SearchResult<Material> | undefined;
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 lg:gap-4 xl:grid-cols-2 2xl:grid-cols-3">
      {data?.items.map((item, index) => (
        <MaterialCard key={index} material={item} />
      ))}
    </div>
  );
};
