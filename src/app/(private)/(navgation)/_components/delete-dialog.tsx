"use client";

import { Button } from "@/components/ui/button";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogIcon,
  DialogTitle,
} from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";

export const DeleteDialog = ({
  handleDelete,
}: {
  handleDelete: () => void;
}) => {
  return (
    <DialogContent size="xsmall">
      <DialogBody className="text-center">
        <DialogIcon size={32} name="delete" className="text-title-light" />
        <DialogTitle className="mt-4 mb-2">
          Tem certeza que deseja excluir?
        </DialogTitle>
        <DialogDescription>
          Essa operação é definitiva. Após executá-la, será preciso refazer o
          processo, pois não há como reverter.
        </DialogDescription>
      </DialogBody>
      <DialogFooter className="flex flex-row gap-3">
        <Button variant="destructive" className="grow" onClick={handleDelete}>
          <Icon name="delete" />
          Deletar
        </Button>
        <DialogClose asChild>
          <Button variant="secondary" className="grow">
            Cancelar
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
