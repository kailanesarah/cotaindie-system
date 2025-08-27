import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getCategoryNameById } from "../../_utils/get-category-by-id";
import { parseCurency } from "../../_utils/parse-currency";
import { formatMeasure } from "../_utils/format-mesure";
import { MaterialDialog } from "./material-dialog";

export const MaterialCard = ({ material }: { material: Material }) => {
  const currencyFormated = parseCurency(material.baseValue);
  const mesureFormated = material.measureType.toUpperCase();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border-b-light rounded-default flex cursor-pointer flex-col gap-5 border bg-white p-6">
          <div className="flex flex-col gap-2">
            <div className="text-title-light text-base font-semibold">
              {material.name}
            </div>
            <p>{material.description}</p>
          </div>
          <Separator />
          <div className="flex justify-between gap-2">
            <span className="text-title-light">
              {currencyFormated} - Por: {mesureFormated} (
              {formatMeasure(material.measure, material.unit)})
            </span>
            <div className="flex gap-2">
              <Badge variant="secondary">
                {getCategoryNameById(material.category)}
              </Badge>
              <Badge>{material.id}</Badge>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <MaterialDialog material={material} />
    </Dialog>
  );
};
