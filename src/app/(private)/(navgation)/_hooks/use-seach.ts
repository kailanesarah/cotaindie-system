import { useEffect } from "react";
import { useSearchContext } from "../_context/seach-provider";

interface IUseSearch<T> {
  action: (params: {
    text: string[];
    category: string;
    sort: "DESC" | "ASC";
  }) => Promise<T>;
}

export function useSearch<T>({ action }: IUseSearch<T>) {
  const {
    state,
    setData,
    setLoading,
    setError,
    data,
    loading,
    error,
    dispatch,
    reset,
  } = useSearchContext<T>();

  useEffect(() => {
    let canceled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await action({
          text: state.text,
          category: state.category,
          sort: state.sort,
        });

        if (!canceled) setData(result);
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
  }, [state.text, state.category, state.sort]);

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
