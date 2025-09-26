"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { Stepper } from "../_provider/project-stepper-provider";
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

  const onSubmit = (values: z.infer<typeof projectSchema>) => {
    console.log(values);
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
