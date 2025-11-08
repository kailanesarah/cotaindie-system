import { Badge } from "@/components/temp/badge";
import { Dialog, DialogTrigger } from "@/components/temp/dialog";
import { Separator } from "@/components/temp/separator";
import { useDialog } from "../../_hooks/use-dialog";
import { parseCurency } from "../../_utils/parse-currency";
import { formatMeasure } from "../_utils/format-mesure";
import { MaterialDialog } from "./material-dialog";

export const MaterialCard = ({ material }: { material: Material }) => {
  const { open, setOpen } = useDialog(`materials:edit-${material.id}`);

  const currencyFormated = parseCurency(material.baseValue);
  const mesureFormated = material.measureType.toUpperCase();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="border-b-light rounded-default flex cursor-pointer flex-col gap-4 border bg-white p-4 lg:gap-5 lg:p-6">
          <div className="flex flex-col gap-2">
            <div className="text-title-light line-clamp-1 text-base font-semibold">
              {material.name}
            </div>
            <p className="line-clamp-2" title={material.description}>
              {material.description}
            </p>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-3 lg:gap-2">
            <span
              className="text-title-light line-clamp-1 text-xs lg:text-sm"
              title={`${currencyFormated} - Por: ${mesureFormated} (
              ${formatMeasure(material.measure, material.unit)})`}
            >
              {currencyFormated} - Por: {mesureFormated} (
              {formatMeasure(material.measure, material.unit)})
            </span>
            <div className="flex gap-2">
              <Badge variant="secondary">{material.category.name}</Badge>
              <Badge>M - {material.code}</Badge>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <MaterialDialog material={material} />
    </Dialog>
  );
};
