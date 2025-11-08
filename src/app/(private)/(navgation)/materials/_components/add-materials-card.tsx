import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { AddButton } from "../../_components/add-button";
import {
  DataBox,
  DataBoxContent,
  DataBoxDescription,
  DataBoxTitle,
} from "../../_components/data-box";
import { MaterialDialog } from "./material-dialog";

export const AddMaterialsCard = ({ className }: { className?: string }) => {
  return (
    <DataBox className={cn(className)}>
      <DataBoxContent>
        <Icon name="add_2" className="text-red-default" size={28} />
        <DataBoxTitle>Adicione um novo material</DataBoxTitle>
        <DataBoxDescription>
          Registre seu primeiro material para iniciar o sistema.
        </DataBoxDescription>
      </DataBoxContent>
      <AddButton text="Novo material" dialogKey="materials:add-card">
        <MaterialDialog />
      </AddButton>
    </DataBox>
  );
};
