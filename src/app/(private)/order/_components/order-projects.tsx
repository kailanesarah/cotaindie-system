"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { useState, type ReactNode } from "react";
import { StepperProvider } from "../_provider/project-stepper-provider";
import { useOrderStore } from "../_stores/order-store";
import { currencyFormatter } from "../_utils/currency-formatter";
import { ProjectsDialog } from "./project-dialog";

export const OrderProjects = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-3">{children}</div>;
};

export const OrderProjectsContent = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

export const OrderProjectsTotal = () => {
  const { order } = useOrderStore();
  const rawAmount = order.rawAmount || 0;

  return (
    <div className="text-title-light text-right text-xs font-semibold">
      Total com projetos: {currencyFormatter.format(rawAmount)}
    </div>
  );
};

export const OrderProjectsActions = () => {
  const { order } = useOrderStore();
  const hasProjects = Boolean(order.projects?.length ?? 0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex gap-3">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="grow">
            <Icon name="add_2" />
            Adicionar projeto
          </Button>
        </DialogTrigger>
        <StepperProvider>
          <ProjectsDialog isOpen={setIsOpen} />
        </StepperProvider>
      </Dialog>
      {hasProjects && (
        <>
          <Button variant="secondary">
            <Icon name="download" />
            Espelho de materiais
          </Button>
          <Button variant="secondary">
            <Icon name="crop" />
            Plano de corte
          </Button>
        </>
      )}
    </div>
  );
};
