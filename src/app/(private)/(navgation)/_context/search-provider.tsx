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

interface PaginationState {
  page: number;
  perPage: number;
  totalPages: number;
}

export interface ExtraFilter {
  key: string;
  value: string;
}

export interface SearchState {
  text: string[];
  sort: SortOrder;
  pagination: PaginationState;
  extras: ExtraFilter[];
}

type SearchAction =
  | { type: "SET_TEXT"; payload: string[] }
  | { type: "SET_SORT"; payload: SortOrder }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_PER_PAGE"; payload: number }
  | { type: "SET_TOTAL_PAGES"; payload: number }
  | { type: "SET_EXTRA"; payload: ExtraFilter }
  | { type: "REMOVE_EXTRA"; payload: string }
  | { type: "RESET" };

const initialState: SearchState = {
  text: [],
  sort: "DESC",
  pagination: { page: 1, perPage: 5, totalPages: 1 },
  extras: [],
};

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "SET_TEXT":
      return {
        ...state,
        text: action.payload,
        pagination: { ...state.pagination, page: 1 },
      };
    case "SET_SORT":
      return {
        ...state,
        sort: action.payload,
        pagination: { ...state.pagination, page: 1 },
      };
    case "SET_PAGE":
      return {
        ...state,
        pagination: { ...state.pagination, page: action.payload },
      };
    case "SET_PER_PAGE":
      return {
        ...state,
        pagination: { ...state.pagination, perPage: action.payload, page: 1 },
      };
    case "SET_TOTAL_PAGES":
      return {
        ...state,
        pagination: { ...state.pagination, totalPages: action.payload },
      };
    case "SET_EXTRA":
      const filteredExtras = state.extras.filter(
        (e) => e.key !== action.payload.key,
      );
      return {
        ...state,
        extras: [...filteredExtras, action.payload],
        pagination: { ...state.pagination, page: 1 },
      };
    case "REMOVE_EXTRA":
      return {
        ...state,
        extras: state.extras.filter((e) => e.key !== action.payload),
      };
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
  data: T[];
  setData: (data: T[]) => void;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

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
  if (!context)
    throw new Error("useSearchContext must be used within SearchProvider");
  return context;
}
