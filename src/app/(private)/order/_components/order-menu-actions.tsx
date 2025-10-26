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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { DeleteDialog } from "../../(navgation)/_components/delete-dialog";
import { useCopyOrder } from "../../(navgation)/orders/_hooks/use-copy-order";

import { upseUpsertOrder } from "../_hooks/use-order-save";
import { useOrderStore } from "../_stores/order-store";

export const OrderMenuActions = () => {
  const { order, setStatusInfo } = useOrderStore();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { execute: handleSave } = upseUpsertOrder();

  const handleDelete = () => {
    console.log("Deleted!");
    setIsDeleteOpen(false);
  };

  const id = order.id;

  const { execute: executeCopy, isPending: isPendingCopy } = useCopyOrder();
  const handleCopy = () => {
    if (id) executeCopy(id);
  };

  return (
    <div className="hidden gap-4 outline-0 lg:flex">
      <Select
        value={order.status ?? undefined}
        onValueChange={(value) => setStatusInfo({ status: value as Status })}
      >
        <Button variant="secondary" className="border-0" asChild>
          <SelectTrigger
            className="hidden outline-0 lg:flex"
            placeholder="Fase do pedido"
          >
            <SelectValue placeholder="Fase do pedido" />
          </SelectTrigger>
        </Button>
        <SelectContent
          align="end"
          className="divide-x divide-gray-300"
          classNameViewport="px-0"
        >
          <SelectItem
            value="OPEN"
            className="text-yellow-darker font-semibold outline-0"
          >
            Apenas cotado
          </SelectItem>
          <Separator />
          <SelectItem
            value="APPROVED"
            className="text-green-default font-semibold outline-0"
          >
            Pedido finalizado
          </SelectItem>
        </SelectContent>
      </Select>
      <div className="flex">
        <Button
          className="rounded-r-none border-0 border-r border-[#d2837cda] focus:z-10"
          onClick={handleSave}
        >
          <Icon name="folder_check" />
          Salvar
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="group w-8 rounded-l-none border-0 focus:z-10">
              <Icon
                name="keyboard_arrow_down"
                className="group-data-[state=OPEN]:rotate-180"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[12.5rem]">
            {id && (
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
          <DeleteDialog handleDelete={handleDelete} />
        </Dialog>
      </div>
    </div>
  );
};
