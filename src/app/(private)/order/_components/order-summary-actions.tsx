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
import { DeleteDialog } from "../../(navgation)/_components/delete-dialog";

export const OrderSummaryActions = ({ project }: { project: Project }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = () => {
    console.log("Deleted!");
    setIsDeleteOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button square variant="link" className="-my-0.5 size-6">
            <Icon name="more_vert" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={12} align="end" alignOffset={16}>
          <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
            <Icon name="edit_square" /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="file_copy" /> Duplicar
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-default"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Icon name="delete" /> Apagar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DeleteDialog handleDelete={handleDelete} />
      </Dialog>
    </>
  );
};
