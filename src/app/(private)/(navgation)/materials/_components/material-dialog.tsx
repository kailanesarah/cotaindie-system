import { Badge } from "@/components/ui/badge";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogHeaderContent,
  DialogIcon,
  DialogTitle,
} from "@/components/ui/dialog";
import { MateriaForm } from "./material-form";

export const MaterialDialog = ({ material }: { material?: Material }) => {
  const id = material?.id;
  const name = material?.name;

  return (
    <DialogContent size="large">
      <DialogHeader>
        <div className="flex items-center gap-3">
          <DialogIcon name="inventory_2" className="hidden lg:block" />
          {material?.id && (
            <Badge className="h-5 text-[0.6875rem] lg:hidden">{id}</Badge>
          )}
        </div>
        <DialogHeaderContent>
          <DialogTitle>
            {id ? name : "Adicione um novo material ou item"}
          </DialogTitle>
          {material?.id && (
            <DialogDescription className="flex gap-3">
              <Badge className="hidden h-5 text-[0.6875rem] lg:block">
                {id}
              </Badge>
              Alterações só serão refletidas em cotações novas.
            </DialogDescription>
          )}
        </DialogHeaderContent>
      </DialogHeader>
      <MateriaForm material={material} />
    </DialogContent>
  );
};
