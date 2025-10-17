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
        <div className="flex items-center gap-3">
          <DialogIcon name="article_person" className="hidden lg:block" />
          {client?.id && (
            <Badge className="h-5 text-[0.6875rem] lg:hidden">{id}</Badge>
          )}
        </div>
        <DialogHeaderContent>
          <DialogTitle>{id ? name : "Adicione um novo cliente"}</DialogTitle>
          {client?.id && (
            <DialogDescription className="flex gap-3">
              <Badge className="hidden h-5 text-[0.6875rem] lg:block">
                {id}
              </Badge>
              Alterações só serão refletidas em cotações novas.
            </DialogDescription>
          )}
        </DialogHeaderContent>
      </DialogHeader>
      <ClientForm client={client} />
    </DialogContent>
  );
};
