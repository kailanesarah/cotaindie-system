"use client";

import { Button } from "@/components/temp/button";
import { Dialog, DialogFooter, DialogTrigger } from "@/components/temp/dialog";
import { Icon } from "@/components/temp/icon";
import { DialogClose } from "@radix-ui/react-dialog";
import { useFormContext } from "react-hook-form";
import { DeleteDialog } from "../../_components/delete-dialog";
import { useDialog } from "../../_hooks/use-dialog";
import { useDeleteMaterial } from "../_hooks/use-delete-material";

export const MaterialActions = ({ isPending }: { isPending: boolean }) => {
  const { execute, isPending: isPendingDelete } = useDeleteMaterial();
  const { watch, reset } = useFormContext();

  const id = watch("id");

  const { open, setOpen } = useDialog(id);

  const handleReset = () => setTimeout(() => reset(), 200);

  return (
    <DialogFooter className="flex flex-row justify-end gap-3">
      <Button type="submit">
        <Icon name="folder_check" />
        Salvar
      </Button>
      {id && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" disabled={isPendingDelete}>
              <Icon name="delete" />
              Apagar
            </Button>
          </DialogTrigger>
          <DeleteDialog handleDelete={() => execute(id)} />
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
