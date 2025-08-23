"use client";

import { useEffect, useState } from "react";
import { deepSearch } from "../_utils/deep-seach";

export const useFilter = <T extends Record<string, any>>(data: T[]) => {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [filteredData, setFilteredData] = useState<T[]>(data);

  useEffect(() => {
    let result = [...data];

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;
      if (Array.isArray(value)) {
        result = result.filter((item) =>
          value.every((v) => deepSearch([item], [v]).length > 0),
        );
      } else if (key !== "order") {
        result = result.filter(
          (item) => deepSearch([item], [value]).length > 0,
        );
      }
    });

    if (filters.order === "desc") result.reverse();

    setFilteredData(result);
  }, [filters, data]);

  const setFilter = (name: string, value: any) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => setFilters({});

  return { filters, setFilter, resetFilters, filteredData };
};
