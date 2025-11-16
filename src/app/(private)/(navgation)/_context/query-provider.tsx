"use client";

import {
  QueryClient,
  QueryClientProvider,
  QueryClient as ReactQueryClient,
} from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [queryClient] = useState<QueryClient>(
    () =>
      new ReactQueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 30, //30 minutes
            refetchOnWindowFocus: true,
            refetchInterval: 1000 * 60 * 30, //30 minutes
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
