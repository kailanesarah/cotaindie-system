"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  DataBox,
  DataBoxContent,
  DataBoxDescription,
  DataBoxTitle,
} from "./data-box";

interface EmptyDataBoxProps {
  onReset: () => void;
  className?: string;
}

export const EmptyDataBox = ({ onReset, className }: EmptyDataBoxProps) => {
  return (
    <DataBox className={className}>
      <DataBoxContent>
        <Icon name="search" className="text-red-default" size={28} />
        <DataBoxTitle>Nenhum resultado encontrado</DataBoxTitle>
        <DataBoxDescription>
          Sugestão: limpe os filtros ou mude os termos de pesquisa para ampliar
          a busca.
        </DataBoxDescription>
      </DataBoxContent>
      <Button onClick={onReset} variant="secondary">
        <Icon name="filter_alt_off" />
        Limpar filtros
      </Button>
    </DataBox>
  );
};
