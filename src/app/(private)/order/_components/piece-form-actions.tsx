"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { DialogClose } from "@radix-ui/react-dialog";
import { useFormContext } from "react-hook-form";

export const PieceFormActions = ({ formId }: { formId: string }) => {
  const { reset } = useFormContext();

  const handleReset = () => setTimeout(() => reset(), 200);

  return (
    <DialogFooter className="flex flex-row justify-end gap-3">
      <Button type="submit" form={formId}>
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
