"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useSearchContext } from "../_context/seach-provider";

export const EmptyDataBox = () => {
  const { reset, data } = useSearchContext<Material[]>();

  if (data.length > 0) return;

  return (
    <div className="rounded-default border-b-light flex flex-col items-center gap-6 border bg-white p-6 pb-10">
      <div className="flex flex-col items-center gap-2">
        <Icon name="search" className="text-red-default" size={28} />
        <div className="text-title-light text-base font-semibold">
          Nenhum resultado encontrado
        </div>
        <p>
          Sugestão: limpe os filtros ou mude os termos de pesquisa para ampliar
          a busca.
        </p>
      </div>
      <Button onClick={reset} variant="secondary">
        <Icon name="filter_alt_off" />
        Limpar filtros
      </Button>
    </div>
  );
};
