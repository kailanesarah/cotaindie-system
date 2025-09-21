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
}: {
  project?: Project;
  index?: number;
}) => {
  const { utils, useStepper } = Stepper;
  const stepper = useStepper();
  const currentIndex = utils.getIndex(stepper.current.id) + 1;

  return (
    <DialogContent size="large">
      <DialogHeader>
        <DialogIcon name="view_timeline" />
        <DialogHeaderContent>
          <DialogTitle>
            {!project ? "Adicionar novo projeto" : "Editar projeto"} - Etapa{" "}
            {currentIndex}
          </DialogTitle>
          {project && (
            <DialogDescription className="flex gap-3">
              <Badge className="h-5 text-[0.6875rem]">N° {index}</Badge>
              Após alterar, lembre de salvar o orçamento
            </DialogDescription>
          )}
        </DialogHeaderContent>
      </DialogHeader>
      <ProjectForm project={project} index={index} />
    </DialogContent>
  );
};
