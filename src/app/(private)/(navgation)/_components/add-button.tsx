"use client";

import { Button } from "@/components/temp/button";
import { Dialog, DialogTrigger } from "@/components/temp/dialog";
import { Icon } from "@/components/temp/icon";
import type { ReactNode } from "react";
import { useDialog } from "../_hooks/use-dialog";

export const AddButton = ({
  children,
  text,
  dialogKey,
}: {
  text: string;
  children: ReactNode;
  dialogKey: string;
}) => {
  const { open, setOpen } = useDialog(dialogKey);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
