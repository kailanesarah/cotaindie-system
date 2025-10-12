"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { useState } from "react";
import { DeleteDialog } from "../../_components/delete-dialog";
import { useDialog } from "../../_hooks/use-dialog";
import { ClientDialog } from "./client-dialog";

export const ClientTableActions = ({ client }: { client: Client }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { open, setOpen } = useDialog(`clients:edit-${client.id}`);

  const handleDelete = () => {
    console.log("Deleted!");
    setIsDeleteOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button square variant="link" className="size-7">
            <Icon name="more_vert" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={12} align="end" alignOffset={16}>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Icon name="edit_square" /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-default"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Icon name="delete" /> Apagar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <ClientDialog client={client} />
      </Dialog>
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DeleteDialog handleDelete={handleDelete} />
      </Dialog>
    </>
  );
};
