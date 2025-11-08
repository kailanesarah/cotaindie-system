"use client";

import { DialogBody } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { useUpsertMaterial } from "../_hooks/use-upsert-material";
import {
  getMaterialDefaultValues,
  materialSchema,
} from "../_schema/material-schema";
import { MaterialBasicFields } from "./materail-basic-fields";
import { MaterialActions } from "./material-actions";
import { MaterialCutFields } from "./material-cut-fields";
import { MaterialDinamicFields } from "./material-dynamic-fields";

export const MateriaForm = ({ material }: { material?: Material }) => {
  const { isPending, execute } = useUpsertMaterial();

  const form = useForm<z.infer<typeof materialSchema>>({
    resolver: zodResolver(materialSchema),
    defaultValues: getMaterialDefaultValues(material),
  });

  const onSubmit = (values: z.infer<typeof materialSchema>) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogBody className="grid grid-cols-1 items-start gap-3 lg:grid-cols-4">
          <MaterialBasicFields />
        </DialogBody>
        <DialogBody className="flex flex-col items-start gap-3 lg:flex-row">
          <MaterialDinamicFields />
        </DialogBody>
        <DialogBody className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:items-start">
          <MaterialCutFields />
        </DialogBody>
        <MaterialActions isPending={isPending} />
      </form>
    </Form>
  );
};
