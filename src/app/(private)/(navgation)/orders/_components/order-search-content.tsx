"use client";

import { EmptyDataBox } from "../../_components/empty-data-box";
import { ErrorDataBox } from "../../_components/error-data-box";
import { LoadingBox } from "../../_components/loading-box";
import { useSearchContext } from "../../_context/search-provider";
import { useOrdersSearch } from "../_hooks/use-search-orders";
import { OrderTable } from "./order-table";

export const OrderSearchContent = () => {
  const { reset } = useSearchContext();
  const { data, error, loading } = useOrdersSearch();

  return (
    <>
      {!loading && data && <OrderTable data={data} />}

      {loading && <LoadingBox />}

      {data && !loading && data.items.length === 0 && !error && (
        <EmptyDataBox onReset={reset} />
      )}

      {error && <ErrorDataBox error={error} />}
    </>
  );
};
