import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import {
  DataBox,
  DataBoxContent,
  DataBoxDescription,
  DataBoxTitle,
} from "../../_components/data-box";
import { AddOrderButton } from "./add-order-button";

export const AddOrderCard = ({ className }: { className?: string }) => {
  return (
    <DataBox className={cn(className)}>
      <DataBoxContent>
        <Icon name="add_2" className="text-red-default" size={28} />
        <DataBoxTitle>Adicione uma novo orçamento</DataBoxTitle>
        <DataBoxDescription>
          Registre seu primeiro orçamento para iniciar o sistema.
        </DataBoxDescription>
      </DataBoxContent>
      <AddOrderButton>Novo orçamento</AddOrderButton>
    </DataBox>
  );
};
