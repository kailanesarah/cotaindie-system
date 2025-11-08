import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { AddButton } from "../../_components/add-button";
import {
  DataBox,
  DataBoxContent,
  DataBoxDescription,
  DataBoxTitle,
} from "../../_components/data-box";
import { ClientDialog } from "./client-dialog";

export const AddClientCard = ({ className }: { className?: string }) => {
  return (
    <DataBox className={cn(className)}>
      <DataBoxContent>
        <Icon name="add_2" className="text-red-default" size={28} />
        <DataBoxTitle>Adicione um novo cliente</DataBoxTitle>
        <DataBoxDescription>
          Registre seu primeiro cliente para iniciar o sistema.
        </DataBoxDescription>
      </DataBoxContent>
      <AddButton text="Novo cliente" dialogKey="clients:add-card">
        <ClientDialog />
      </AddButton>
    </DataBox>
  );
};
