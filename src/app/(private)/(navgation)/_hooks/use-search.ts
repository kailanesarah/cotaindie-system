"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type { SearchResult } from "../../_types/search-result";
import {
  useSearchContext,
  type SearchState,
} from "../_context/search-provider";

export interface UseSearchOptions<T> {
  onSuccess?: (data: SearchResult<T>) => void;
  onError?: (error: string) => void;
}

interface UseSearchParams<T> {
  name: string;
  action: (params: SearchState) => Promise<SearchResult<T>>;
  options?: UseSearchOptions<T>;
}

export function useSearch<T>({ name, action, options }: UseSearchParams<T>) {
  const { state, setData, setLoading, setError, dispatch } =
    useSearchContext<T>();

  const lastDataRef = useRef<SearchResult<T> | null>(null);
  const lastErrorRef = useRef<string | null>(null);

  const queryKey = [
    name,
    state.text,
    state.sort,
    state.pagination.page,
    state.pagination.perPage,
    state.extras.map((e) => `${e.key}:${e.value}`).join(","),
  ] as const;

  const query = useQuery<SearchResult<T>, Error>({
    queryKey,
    queryFn: () =>
      action({
        text: state.text,
        sort: state.sort,
        pagination: state.pagination,
        extras: state.extras,
      }),
  });

  useEffect(() => {
    setLoading(query.isFetching);
  }, [query.isFetching, setLoading]);

  useEffect(() => {
    if (query.data && query.data !== lastDataRef.current) {
      lastDataRef.current = query.data;

      setData(query.data.items);
      dispatch({ type: "SET_TOTAL_PAGES", payload: query.data.totalPages });
      dispatch({ type: "SET_PAGE", payload: query.data.page });

      options?.onSuccess?.(query.data);
    }
  }, [query.data, dispatch, setData, options]);

  useEffect(() => {
    if (query.error && query.error.message !== lastErrorRef.current) {
      lastErrorRef.current = query.error.message;

      console.error("Seach error:", query.error);

      setError(query.error.message || "Um erro desconhecido ocorreu");
      options?.onError?.(query.error.message || "Um erro desconhecido ocorreu");
    }
  }, [query.error, setError, options]);

  return {
    dispatch,
    data: query.data,
    loading: query.isFetching,
    error: query.error?.message || null,
  };
}
