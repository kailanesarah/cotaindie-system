"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import type { ReactNode } from "react";
import { StepperProvider } from "../_provider/project-stepper-provider";
import { ProjectsDialog } from "./project-dialog";

export const OrderProjects = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-3">{children}</div>;
};

export const OrderProjectsContent = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

export const OrderProjectsTotal = () => {
  return (
    <div className="text-title-light text-right text-xs font-semibold">
      Total com projetos: R$ 6.522,21
    </div>
  );
};

export const OrderProjectsActions = () => {
  return (
    <div className="flex gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="grow">
            <Icon name="add_2" />
            Adicionar projeto
          </Button>
        </DialogTrigger>
        <StepperProvider>
          <ProjectsDialog />
        </StepperProvider>
      </Dialog>
      <Button variant="secondary">
        <Icon name="download" />
        Espelho de materiais
      </Button>
      <Button variant="secondary">
        <Icon name="crop" />
        Plano de corte
      </Button>
    </div>
  );
};
