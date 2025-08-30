"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";

type SortOrder = "DESC" | "ASC";

interface SearchState {
  text: string[];
  category: string;
  sort: SortOrder;
}

type SearchAction =
  | { type: "SET_TEXT"; payload: string[] }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_SORT"; payload: SortOrder }
  | { type: "RESET" };

const initialState: SearchState = {
  text: [],
  category: "",
  sort: "DESC",
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "SET_TEXT":
      return { ...state, text: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface SearchContextProps<T> {
  state: SearchState;
  dispatch: React.Dispatch<SearchAction>;
  reset: () => void;
  data: T;
  setData: (data: T) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const SearchContext = createContext<SearchContextProps<any> | undefined>(
  undefined,
);

export function SearchProvider<T>({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      reset,
      data,
      setData,
      loading,
      setLoading,
      error,
      setError,
    }),
    [state, data, loading, error, reset],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearchContext<T>() {
  const context = useContext<SearchContextProps<T> | undefined>(SearchContext);
  if (!context) throw new Error("useSearchContext not found");

  return context;
}
