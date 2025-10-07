"use client";

import { Badge } from "@/components/ui/badge";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogHeaderContent,
  DialogIcon,
  DialogTitle,
} from "@/components/ui/dialog";
import { Stepper } from "../_provider/project-stepper-provider";
import { ProjectForm } from "./project-form";

export const ProjectsDialog = ({
  project,
  index,
  isOpen,
}: {
  project?: Project;
  index?: number;
  isOpen: (value: boolean) => void;
}) => {
  const { utils, useStepper } = Stepper;
  const stepper = useStepper();
  const currentIndex = utils.getIndex(stepper.current.id) + 1;

  const projectNumber = index !== undefined ? index + 1 : undefined;

  return (
    <DialogContent size="large">
      <DialogHeader>
        <div className="flex items-center gap-3">
          <DialogIcon name="view_timeline" className="hidden lg:block" />
          {project && (
            <Badge className="h-5 text-[0.6875rem] lg:hidden">
              N° {projectNumber}
            </Badge>
          )}
        </div>
        <DialogHeaderContent>
          <DialogTitle>
            {project
              ? `Editar projeto - Etapa ${currentIndex}`
              : `Adicionar novo projeto - Etapa ${currentIndex}`}
          </DialogTitle>
          {project && (
            <DialogDescription className="flex gap-3">
              <Badge className="hidden h-5 text-[0.6875rem] lg:block">
                N° {projectNumber}
              </Badge>
              Após alterar, lembre-se de salvar o orçamento.
            </DialogDescription>
          )}
        </DialogHeaderContent>
      </DialogHeader>
      <ProjectForm project={project} index={index} isOpen={isOpen} />
    </DialogContent>
  );
};
