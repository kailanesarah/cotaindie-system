"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { useSearchContext } from "../_context/search-provider";

export const EmptyDataBox = ({ className }: { className?: string }) => {
  const { reset, data, loading } = useSearchContext<Material[]>();

  if (data.length > 0 || loading) return;

  return (
    <div
      className={cn(
        "rounded-default border-b-light flex flex-col items-center gap-6 border bg-white p-4 text-center lg:p-6 lg:pb-10",
        className,
      )}
    >
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
