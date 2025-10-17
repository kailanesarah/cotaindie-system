"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { ReactNode } from "react";
import { currencyFormatter } from "../_utils/currency-formatter";

export const PiecesCosts = ({ children }: { children: ReactNode }) => {
  return <div className="flex grow flex-col gap-3">{children}</div>;
};

export const PiecesCostsContent = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

export const PiecesCostsTotal = ({ total }: { total: number }) => {
  const totalFormated = currencyFormatter.format(total);

  return (
    <div className="text-title-light flex justify-end gap-2.5 text-xs font-semibold">
      Total em despesas: {totalFormated}
    </div>
  );
};

type PiecesCostsActionsProps = {
  append: (value: { name: string; qtde: number; value: number }) => void;
};

export const PiecesCostsActions = ({ append }: PiecesCostsActionsProps) => {
  return (
    <Button
      variant="secondary"
      className="w-full"
      onClick={() => append({ name: "", qtde: 1, value: 0 })}
    >
      <Icon name="add_2" />
      Adicionar novo custo
    </Button>
  );
};
