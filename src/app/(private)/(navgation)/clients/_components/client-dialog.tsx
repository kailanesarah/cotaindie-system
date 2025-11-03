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
  const code = client?.code;
  const name = client?.name;

  return (
    <DialogContent size="large">
      <DialogHeader>
        <div className="flex items-center gap-3">
          <DialogIcon name="article_person" className="hidden lg:block" />
          {code && (
            <Badge className="h-5 text-[0.6875rem] lg:hidden">{code}</Badge>
          )}
        </div>
        <DialogHeaderContent>
          <DialogTitle>{code ? name : "Adicione um novo cliente"}</DialogTitle>
          {code && (
            <DialogDescription className="flex gap-3">
              <Badge className="hidden h-5 text-[0.6875rem] lg:block">
                C - {code}
              </Badge>
              Alterações serão aplicadas parcialmente em cotações atigas.
            </DialogDescription>
          )}
        </DialogHeaderContent>
      </DialogHeader>
      <ClientForm client={client} />
    </DialogContent>
  );
};
