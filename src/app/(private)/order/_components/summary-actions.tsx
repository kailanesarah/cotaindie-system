"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { useState } from "react";
import { DeleteDialog } from "../../(navgation)/_components/delete-dialog";
import { StepperProvider } from "../_provider/project-stepper-provider";
import { useOrderStore } from "../_stores/order-store";
import { ProjectsDialog } from "./project-dialog";

export const SummaryActions = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { deleteProject, duplicateProject } = useOrderStore();

  const handleDelete = () => {
    deleteProject(index);
    setIsDeleteOpen(false);
  };

  const handleDuplicate = () => {
    duplicateProject(index);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button square variant="link" className="-my-0.5 size-6">
            <Icon name="more_vert" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={12} align="end" alignOffset={16}>
          <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
            <Icon name="edit_square" /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDuplicate}>
            <Icon name="file_copy" /> Duplicar
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-default"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Icon name="delete" /> Apagar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DeleteDialog handleDelete={handleDelete} />
      </Dialog>
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <StepperProvider>
          <ProjectsDialog
            project={project}
            index={index}
            isOpen={setIsEditOpen}
          />
        </StepperProvider>
      </Dialog>
    </>
  );
};
