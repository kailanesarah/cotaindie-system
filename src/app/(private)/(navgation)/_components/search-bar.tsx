"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
  useMemo,
  useState,
} from "react";
import { FilterContext, useFilterContext } from "../_context/filter-context";
import { useFilter } from "../_hooks/use-filter";

export const SearchProvider = <T extends Record<string, any>>({
  data,
  children,
}: {
  data: T[];
  children: React.ReactNode;
}) => {
  const { filters, setFilter, resetFilters, filteredData } = useFilter(data);

  const value = useMemo(
    () => ({
      filters,
      setFilter,
      resetFilters,
      data: filteredData,
    }),
    [filters, setFilter, resetFilters, filteredData],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const SearchBar = ({ children }: { children: ReactNode }) => (
  <div className="border-b-light top-0 flex gap-6 border-b bg-white p-6">
    {children}
  </div>
);

export const SearchSortWrap = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-3">{children}</div>
);

const SearchBadge = ({
  term,
  onRemove,
}: {
  term: string;
  onRemove: (term: string) => void;
}) => (
  <Badge className="border-red-default text-xs shadow-[0_-0.25rem_1.25rem_0_rgba(0,0,0,0.04)_inset,0_0.1875rem_0.3125rem_0_rgba(0,0,0,0.05)]">
    {term}
    <button
      onClick={() => onRemove(term)}
      aria-label={`Remover filtro ${term}`}
      className="text-title-light flex cursor-pointer items-center"
    >
      <Icon name="close" size={16} />
    </button>
  </Badge>
);

const SearchBadgeGroup = ({
  filters,
  removeFilter,
  maxVisible = 3,
}: {
  filters: string[];
  removeFilter: (term: string) => void;
  maxVisible?: number;
}) => {
  const visibleFilters = filters.slice(0, maxVisible);
  const extraCount = filters.length - maxVisible;

  return (
    <div className="pointer-events-none absolute right-0 flex h-full items-center justify-end gap-2 pr-4">
      {visibleFilters.map((term) => (
        <div key={term} className="pointer-events-auto">
          <SearchBadge term={term} onRemove={removeFilter} />
        </div>
      ))}
      {extraCount > 0 && (
        <Badge variant="secondary" className="pointer-events-auto">
          +{extraCount} filtro{extraCount > 1 ? "s" : ""}
        </Badge>
      )}
    </div>
  );
};

export const SearchTextFilter = ({
  name,
  placeholder = "Pesquise por termos...",
}: {
  name: string;
  placeholder?: string;
}) => {
  const MAX_TAGS = 3;

  const { filters, setFilter } = useFilterContext();
  const [input, setInput] = useState("");
  const currentFilters: string[] = filters[name] || [];

  const addFilter = () => {
    const val = input.trim();
    if (!val) return;
    if (!currentFilters.includes(val)) {
      setFilter(name, [...currentFilters, val]);
      setInput("");
    }
  };

  const removeFilter = (term: string) => {
    setFilter(
      name,
      currentFilters.filter((f) => f !== term),
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFilter();
    }
  };

  return (
    <div className="relative flex grow gap-3">
      <div className="relative flex grow">
        <Input
          placeholder={placeholder}
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />
        <SearchBadgeGroup
          filters={currentFilters}
          removeFilter={removeFilter}
          maxVisible={MAX_TAGS}
        />
      </div>

      <Button onClick={addFilter} square>
        <Icon name="search" />
      </Button>
    </div>
  );
};

export const SelectFilter = ({
  name,
  options,
}: {
  name: string;
  options: string[];
}) => {
  const { filters, setFilter } = useFilterContext();

  const handleChange = (value: string) => {
    if (value === "all") {
      setFilter(name, "");
    } else {
      setFilter(name, value);
    }
  };

  return (
    <Select value={filters[name] || "all"} onValueChange={handleChange}>
      <Button variant="secondary" asChild>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </Button>
      <SelectContent align="end">
        <SelectItem value="all">{name}</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const SearchSortPeriod = () => {
  const { filters, setFilter } = useFilterContext();

  return (
    <Select
      value={filters["order"] || "asc"}
      onValueChange={(value) => setFilter("order", value)}
    >
      <Button variant="secondary" asChild>
        <SelectTrigger>
          <SelectValue placeholder="Ordenar" />
        </SelectTrigger>
      </Button>
      <SelectContent>
        <SelectItem value="asc">Recentes</SelectItem>
        <SelectItem value="desc">Antigos</SelectItem>
      </SelectContent>
    </Select>
  );
};
