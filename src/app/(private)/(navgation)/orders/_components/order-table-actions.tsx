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
import Link from "next/link";
import { DeleteDialog } from "../../_components/delete-dialog";
import { useDialog } from "../../_hooks/use-dialog";
import { useCopyOrder } from "../_hooks/use-copy-order";
import { useDeleteOrder } from "../_hooks/use-delete-order";

export const OrderTableActions = ({ order }: { order: Order }) => {
  const { open: isDeleteOpen, setOpen: setDeleteOpen } = useDialog(order.id);

  const { execute: executeDelete, isPending: isPendingDelete } =
    useDeleteOrder();
  const handleDelete = () => setDeleteOpen(true);

  const { execute: executeCopy, isPending: isPendingCopy } = useCopyOrder();
  const handleCopy = () => executeCopy(order.id);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button square variant="link" className="size-[1.375rem]">
            <Icon name="more_vert" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={12} align="end" alignOffset={16}>
          <Link href={`/order/${order.id}`} target="_blank">
            <DropdownMenuItem>
              <Icon name="edit_square" /> Editar
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={handleCopy} disabled={isPendingCopy}>
            <Icon name="file_copy" /> Fazer cópia
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="crop" /> Plano de corte
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="download" /> Espelho de materiais
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="contract" /> Baixar contrato
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-default" onClick={handleDelete}>
            <Icon name="delete" /> Apagar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDeleteOpen} onOpenChange={setDeleteOpen}>
        <DeleteDialog
          handleDelete={() => executeDelete(order.id)}
          isPending={isPendingDelete}
        />
      </Dialog>
    </>
  );
};
