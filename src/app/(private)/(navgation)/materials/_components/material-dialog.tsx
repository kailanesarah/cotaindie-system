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
        <DialogIcon name="inventory_2" />
        <DialogHeaderContent>
          <DialogTitle>
            {id ? name : "Adicione um novo material ou item"}
          </DialogTitle>
          {material?.id && (
            <DialogDescription className="flex gap-3">
              <Badge className="h-5 text-[0.6875rem]">{id}</Badge>
              Alterações só serão refletidas em cotações novas.
            </DialogDescription>
          )}
        </DialogHeaderContent>
      </DialogHeader>
      <MateriaForm material={material} />
    </DialogContent>
  );
};
