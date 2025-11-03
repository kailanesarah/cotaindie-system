"use client";

import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import {
  QueryClient,
  QueryClientProvider,
  QueryClient as ReactQueryClient,
} from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { useEffect, useState, type ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [queryClient] = useState<QueryClient>(
    () =>
      new ReactQueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            refetchInterval: 1000 * 60 * 5,
            retry: 2,
          },
        },
      }),
  );

  useEffect(() => {
    const localStoragePersistor = createAsyncStoragePersister({
      storage: window.localStorage,
      key: "react-query",
    });

    const [, promise] = persistQueryClient({
      queryClient,
      persister: localStoragePersistor,
      maxAge: 1000 * 60 * 60 * 1,
    });

    promise.catch((error) => {
      console.error("React Query cache error:", error);
    });
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
