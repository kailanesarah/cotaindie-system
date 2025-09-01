"use client";

import { useEffect } from "react";
import {
  type ExtraFilter,
  useSearchContext,
} from "../_context/search-provider";

interface IUseSearch<T> {
  action: (params: {
    text: string[];
    sort: "DESC" | "ASC";
    pagination: { page: number; perPage: number };
    extras: ExtraFilter[];
  }) => Promise<{ items: T[]; totalPages: number }>;
}

export function useSearch<T>({ action }: IUseSearch<T>) {
  const {
    state,
    setData,
    setLoading,
    setError,
    dispatch,
    reset,
    data,
    loading,
    error,
  } = useSearchContext<T>();

  useEffect(() => {
    let canceled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await action({
          text: state.text,
          sort: state.sort,
          pagination: state.pagination,
          extras: state.extras,
        });

        if (!canceled) {
          setData(result.items);
          dispatch({ type: "SET_TOTAL_PAGES", payload: result.totalPages });
        }
      } catch {
        if (!canceled) setError("Erro ao buscar dados");
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      canceled = true;
    };
  }, [
    state.text,
    state.sort,
    state.pagination.page,
    state.pagination.perPage,
    state.extras.map((e) => `${e.key}:${e.value}`).join(","),
  ]);

  return {
    state,
    data,
    loading,
    error,
    dispatch,
    reset,
    setData,
    setLoading,
    setError,
  };
}
