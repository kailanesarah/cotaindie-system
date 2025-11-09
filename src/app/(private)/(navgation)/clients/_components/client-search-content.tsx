"use client";

import { EmptyDataBox } from "../../_components/empty-data-box";
import { ErrorDataBox } from "../../_components/error-data-box";
import { LoadingBox } from "../../_components/loading-box";
import { useSearchContext } from "../../_context/search-provider";
import { useClientsSearch } from "../_hooks/use-search-clients";
import { ClientsTable } from "./client-table";

export const ClientSearchContent = () => {
  const { reset } = useSearchContext();
  const { data, error, loading } = useClientsSearch();

  return (
    <>
      {!loading && <ClientsTable data={data} />}

      {loading && <LoadingBox />}

      {data && !loading && data.items.length === 0 && !error && (
        <EmptyDataBox onReset={reset} />
      )}

      {error && <ErrorDataBox error={error} />}
    </>
  );
};
