import { createContext, useContext } from "react";

type FilterContextType<T> = {
  filters: Record<string, any>;
  setFilter: (name: string, value: any) => void;
  resetFilters: () => void;
  data: T[];
};

export const FilterContext = createContext<FilterContextType<any> | null>(null);

export const useFilterContext = <T>() => {
  const ctx = useContext(FilterContext) as FilterContextType<T>;
  if (!ctx) throw new Error("Filter context not found");
  return ctx;
};
