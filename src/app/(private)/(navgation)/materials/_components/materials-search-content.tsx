"use client";

import { EmptyDataBox } from "../../_components/empty-data-box";
import { ErrorDataBox } from "../../_components/error-data-box";
import { LoadingBox } from "../../_components/loading-box";
import { useSearchContext } from "../../_context/search-provider";
import { useMaterialsSearch } from "../_hooks/use-search-materials";
import { ResultGrid } from "./material-grid";

export const MaterialsSearchContent = () => {
  const { reset } = useSearchContext();
  const { data, error, loading } = useMaterialsSearch();

  return (
    <>
      {!loading && data && <ResultGrid data={data} />}

      {loading && <LoadingBox className="p-0 lg:p-0" />}

      {data && !loading && data.items.length === 0 && !error && (
        <EmptyDataBox onReset={reset} className="m-0 lg:m-0" />
      )}

      {error && <ErrorDataBox error={error} />}
    </>
  );
};
