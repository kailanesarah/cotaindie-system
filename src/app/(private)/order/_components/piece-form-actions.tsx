"use client";

import { Button } from "@/components/temp/button";
import { DialogFooter } from "@/components/temp/dialog";
import { Icon } from "@/components/temp/icon";
import { DialogClose } from "@radix-ui/react-dialog";
import { useFormContext } from "react-hook-form";

export const PieceFormActions = ({ onSubmit }: { onSubmit: () => void }) => {
  const { reset } = useFormContext();

  const handleReset = () => setTimeout(() => reset(), 200);

  return (
    <DialogFooter className="flex flex-row justify-end gap-3">
      <Button type="button" onClick={onSubmit}>
        <Icon name="add_2" />
        Adicionar
      </Button>
      <DialogClose asChild>
        <Button type="button" variant="secondary" onClick={handleReset}>
          Cancelar
        </Button>
      </DialogClose>
    </DialogFooter>
  );
};
