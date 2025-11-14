"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import type { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { currencyFormatter } from "../_utils/currency-formatter";
import { PieceDialog } from "./piece-dialog";

export const ProjectPieces = ({ children }: { children: ReactNode }) => {
  return <div className="flex grow flex-col gap-3">{children}</div>;
};

export const PiecesContent = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

export const PiecesTotal = () => {
  const form = useFormContext();
  const qtde = (form.watch("pieces") || []).length || 1;
  const qtdeProjects = form.watch("qtde") || [] || 1;

  const rawAmount = form.watch("rawAmount") || 0;

  return (
    <div className="text-title-light flex justify-end gap-2.5 text-xs font-semibold">
      <span>Variedade de itens: {qtde}</span>
      <span>-</span>
      <span>
        Total com materiais:{" "}
        {currencyFormatter.format(rawAmount * qtdeProjects)}
      </span>
    </div>
  );
};

export const PiecesActions = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          <Icon name="add_2" />
          Nova peça
        </Button>
      </DialogTrigger>
      <PieceDialog />
    </Dialog>
  );
};
