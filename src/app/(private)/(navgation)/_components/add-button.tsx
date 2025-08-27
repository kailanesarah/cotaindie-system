import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import type { ReactNode } from "react";

export const AddMaterialButton = ({
  children,
  text,
}: {
  text: string;
  children: ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Icon name="add_2" />
          {text}
        </Button>
      </DialogTrigger>
      {children}
    </Dialog>
  );
};
