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

export const OrderMenuActions = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = () => {
    console.log("Deleted!");
    setIsDeleteOpen(false);
  };

  return (
    <div className="flex gap-4">
      <Select>
        <Button variant="secondary" className="border-0" asChild>
          <SelectTrigger className="outline-0" placeholder="Fase do pedido">
            <SelectValue />
          </SelectTrigger>
        </Button>
        <SelectContent align="end" className="divide-x divide-gray-300 px-0">
          <SelectItem
            value="open"
            className="text-yellow-darker font-semibold outline-0"
          >
            Apenas cotado
          </SelectItem>
          <Separator />
          <SelectItem
            value="approved"
            className="text-green-default font-semibold outline-0"
          >
            Pedido finalizado
          </SelectItem>
        </SelectContent>
      </Select>
      <div className="flex">
        <Button className="rounded-r-none border-0 border-r border-[#d2837cda] focus:z-10">
          <Icon name="folder_check" />
          Salvar
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-8 rounded-l-none border-0 focus:z-10">
              <Icon name="keyboard_arrow_down" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[12.5rem]">
            <DropdownMenuItem>
              <Icon name="file_copy" /> Duplicar e salvar
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem>
              <Icon name="picture_as_pdf" /> Exportar PDF
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem>
              <Icon name="crop" /> Plano de corte
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem>
              <Icon name="download" /> Espelho de materiais
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem>
              <Icon name="contract" /> Baixar contrato
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem>
              <Icon name="logout" /> Finalizar e salvar
            </DropdownMenuItem>
            <Separator />
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
