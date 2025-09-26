"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { DialogClose } from "@radix-ui/react-dialog";
import { useFormContext } from "react-hook-form";

export const PieceFormActions = () => {
  const { reset } = useFormContext();

  const handleReset = () => setTimeout(() => reset(), 200);

  return (
    <DialogFooter className="flex flex-row justify-end gap-3">
      <Button>
        <Icon name="add_2" />
        Adicionar
      </Button>

      <DialogClose asChild>
        <Button variant="secondary" onClick={handleReset}>
          Cancelar
        </Button>
      </DialogClose>
    </DialogFooter>
  );
};
