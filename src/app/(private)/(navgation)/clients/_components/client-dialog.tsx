import { Badge } from "@/components/ui/badge";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogHeaderContent,
  DialogIcon,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClientForm } from "./client-form";

export const ClientDialog = ({ client }: { client?: Client }) => {
  const id = client?.id;
  const name = client?.name;

  return (
    <DialogContent size="large">
      <DialogHeader>
        <DialogIcon name="article_person" />
        <DialogHeaderContent>
          <DialogTitle>{id ? name : "Adicione um novo cliente"}</DialogTitle>
          {client?.id && (
            <DialogDescription className="flex gap-3">
              <Badge className="h-5 text-[0.6875rem]">{id}</Badge>
              Alterações só serão refletidas em cotações novas.
            </DialogDescription>
          )}
        </DialogHeaderContent>
      </DialogHeader>
      <ClientForm client={client} />
    </DialogContent>
  );
};
