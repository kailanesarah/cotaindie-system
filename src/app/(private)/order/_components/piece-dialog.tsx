import {
  DialogContent,
  DialogHeader,
  DialogHeaderContent,
  DialogIcon,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormContext } from "react-hook-form";
import { PieceForm } from "./piece-form";

export const PieceDialog = () => {
  const form = useFormContext();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogIcon name="carpenter" />
        <DialogHeaderContent>
          <DialogTitle>Adicionar nova peça</DialogTitle>
        </DialogHeaderContent>
      </DialogHeader>
      <PieceForm formParent={form} />
    </DialogContent>
  );
};
