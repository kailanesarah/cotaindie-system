"use client";

import type { SearchResult } from "@/app/(private)/_types/search-result";
import { MaterialCard } from "./material-card";

export const ResultGrid = ({
  data,
}: {
  data: SearchResult<Material> | undefined;
}) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-3 2xl:grid-cols-4">
      {data?.items.map((item, index) => (
        <MaterialCard key={index} material={item} />
      ))}
    </div>
  );
};
