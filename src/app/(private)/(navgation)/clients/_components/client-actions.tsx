"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { DialogClose } from "@radix-ui/react-dialog";
import { useFormContext } from "react-hook-form";
import { DeleteDialog } from "../../_components/delete-dialog";

export const ClientActions = ({ isPending }: { isPending: boolean }) => {
  const { watch, reset } = useFormContext();
  const id = watch("id");

  const handleReset = () => setTimeout(() => reset(), 200);

  return (
    <DialogFooter className="flex flex-row justify-end gap-3">
      <Button type="submit">
        <Icon name="folder_check" />
        Salvar
      </Button>
      {id && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">
              <Icon name="delete" />
              Apagar
            </Button>
          </DialogTrigger>
          <DeleteDialog handleDelete={() => {}} />
        </Dialog>
      )}
      <DialogClose asChild>
        <Button
          variant={id ? "outline" : "secondary"}
          onClick={handleReset}
          disabled={isPending}
        >
          Cancelar
        </Button>
      </DialogClose>
    </DialogFooter>
  );
};
