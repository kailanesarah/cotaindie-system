import { Icon } from "@/components/ui/icon";
import { AddButton } from "../../_components/add-button";
import {
  DataBox,
  DataBoxContent,
  DataBoxDescription,
  DataBoxTitle,
} from "../../_components/data-box";
import { ClientDialog } from "./client-dialog";

export const AddClientCard = () => {
  return (
    <DataBox className="mx-4 my-3 lg:mx-6 lg:my-4">
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
