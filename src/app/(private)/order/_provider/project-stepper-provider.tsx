"use client";

import { defineStepper } from "@stepperize/react";
import * as React from "react";
import { projectSchema } from "../schema/project-form-schema";

export const Stepper = defineStepper(
  { id: "pieces", label: "pieces", schema: projectSchema },
  { id: "costs", label: "costs", schema: projectSchema },
);

export const StepperProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Stepper.Scoped>{children}</Stepper.Scoped>;
};
