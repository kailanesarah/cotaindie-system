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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteDialog } from "../../(navgation)/_components/delete-dialog";
import { useCopyOrder } from "../../(navgation)/orders/_hooks/use-copy-order";
import { useDeleteOrder } from "../../(navgation)/orders/_hooks/use-delete-order";
import { useUpsertOrder } from "../_hooks/use-order-save";
import { useOrderStore } from "../_stores/order-store";

interface FavButtonWrapperProps {
  children: React.ReactNode;
}

export const FavButtonWrapper = ({ children }: FavButtonWrapperProps) => (
  <div className="fixed right-4 bottom-[6rem] z-50 flex flex-col items-end gap-3 lg:hidden">
    {children}
  </div>
);

export const SaveButton = () => {
  const { execute: handleSave } = useUpsertOrder();

  return (
    <Button
      onClick={handleSave}
      square
      className="group h-[3.25rem] min-w-[3.25rem] !rounded-[0.5rem] shadow-[0_0_32px_0_rgba(0,0,0,0.16)]"
    >
      <Icon name="folder_check" className="text-white" />
    </Button>
  );
};

export const OptionsButton = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { order } = useOrderStore();
  const router = useRouter();

  const { execute: executeDelete, isPending: isPendingDelete } =
    useDeleteOrder();
  const { execute: executeCopy, isPending: isPendingCopy } = useCopyOrder();

  const handleDelete = async () => {
    if (order.id) {
      executeDelete(order.id);
    }

    setIsDeleteOpen(false);

    window.close();
    router.push("/orders");
  };

  const handleCopy = () => {
    if (order.id) executeCopy(order.id);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="group">
          <Button
            className="h-[2.5rem] w-[2.5rem] min-w-[2.5rem] !rounded-[0.5rem] shadow-[0_0_32px_0_rgba(0,0,0,0.16)]"
            variant="secondary"
            square
          >
            <Icon
              name="keyboard_arrow_down"
              className="group-data-[state=open]:rotate-180"
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          sideOffset={8}
          align="end"
          className="min-w-[12.5rem]"
        >
          {order.id && (
            <DropdownMenuItem onClick={handleCopy} disabled={isPendingCopy}>
              <Icon name="file_copy" /> Fazer cópia
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Icon name="picture_as_pdf" /> Exportar PDF
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
          <DropdownMenuItem>
            <Icon name="logout" /> Finalizar e salvar
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
        <DeleteDialog handleDelete={handleDelete} isPending={isPendingDelete} />
      </Dialog>
    </>
  );
};
