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
import { useGenerateContractDocument } from "../../_hooks/use-generate-contract-document";
import { useGenerateMaterialsDocument } from "../../_hooks/use-generate-materials-document";
import { useGenerateQuoteDocument } from "../../_hooks/use-generate-quote-document";
import { mapOrderToContractDoc } from "../../_utils/map-order-to-contract-doc";
import { mapOrderToMaterialsDoc } from "../../_utils/map-order-to-materials-doc";
import { mapOrderToQuoteDoc } from "../../_utils/map-order-to-quote-doc";
import { useCopyOrder } from "../_hooks/use-copy-order";
import { useDeleteOrder } from "../_hooks/use-delete-order";

export const OrderTableActions = ({ order }: { order: Order }) => {
  const { open: isDeleteOpen, setOpen: setDeleteOpen } = useDialog(order.id);

  const { execute: executeDelete, isPending: isPendingDelete } =
    useDeleteOrder();
  const handleDelete = () => setDeleteOpen(true);

  const { execute: executeCopy, isPending: isPendingCopy } = useCopyOrder();
  const handleCopy = () => executeCopy(order.id);

  const { generateQuoteDocument } = useGenerateQuoteDocument();
  const handleGenerateQuote = () => {
    const quoteDoc = mapOrderToQuoteDoc(order);
    if (!quoteDoc) {
      return;
    }

    generateQuoteDocument(quoteDoc);
  };

  const { generateContractDocument } = useGenerateContractDocument();
  const handleGenerateContract = () => {
    const contractDoc = mapOrderToContractDoc(order);
    if (!contractDoc) {
      return;
    }

    generateContractDocument(contractDoc);
  };

  const { generateMaterialsDocument } = useGenerateMaterialsDocument();
  const handleGenerateMaterial = () => {
    const materialDoc = mapOrderToMaterialsDoc(order);
    if (!materialDoc) {
      return;
    }

    generateMaterialsDocument(materialDoc);
  };
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
          <DropdownMenuItem
            onClick={handleGenerateQuote}
            disabled={isPendingCopy}
          >
            <Icon name="download" /> Baixar orçamento
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopy} disabled={isPendingCopy}>
            <Icon name="file_copy" /> Fazer cópia
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="crop" /> Plano de corte
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleGenerateMaterial}>
            <Icon name="download" /> Espelho de materiais
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleGenerateContract}>
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
