import {
  DialogContent,
  DialogHeader,
  DialogHeaderContent,
  DialogIcon,
  DialogTitle,
} from "@/components/ui/dialog";
import { PieceForm } from "./piece-form";

export const PieceDialog = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogIcon name="carpenter" />
        <DialogHeaderContent>
          <DialogTitle>Adicionar nova peça</DialogTitle>
        </DialogHeaderContent>
      </DialogHeader>
      <PieceForm />
    </DialogContent>
  );
};
