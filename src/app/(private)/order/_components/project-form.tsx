"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { useProjectForm } from "../_hooks/use-project-form";
import { Stepper } from "../_provider/project-stepper-provider";
import { useOrderStore } from "../_stores/order-store";
import {
  getProjectDefaultValues,
  projectSchema,
} from "../schema/project-form-schema";
import { ProjectActions } from "./project-form-actions";
import { ProjectStepOne } from "./project-step-one";
import { ProjectStepTwo } from "./project-step-two";

export const ProjectForm = ({
  project,
  index,
}: {
  project?: Project;
  index?: number;
}) => {
  const stepper = Stepper.useStepper();

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(stepper.current.schema),
    mode: "onBlur",
    defaultValues: getProjectDefaultValues(project),
  });

  useEffect(() => {
    return () => {
      stepper.reset();
    };
  }, []);

  const setTrigger = useOrderStore((state) => state.setTrigger);

  useEffect(() => {
    setTrigger("projectsForm", form.trigger);
  }, [form.trigger, setTrigger]);

  const { saveProject } = useProjectForm();

  const onSubmit = (values: z.infer<typeof projectSchema>) => {
    saveProject(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {stepper.switch({
          pieces: () => <ProjectStepOne />,
          costs: () => <ProjectStepTwo />,
        })}
        <ProjectActions index={index} />
      </form>
    </Form>
  );
};
