"use client";

import { DialogBody } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputDisabled } from "@/components/ui/input-disabled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import type z from "zod";
import { measureMap } from "../../_constants/mesure-map";
import {
  materialDefaultValues,
  materialSchema,
} from "../_schema/material-schema";
import { MaterialBasicFields } from "./materail-basic-fields";
import { MaterialActions } from "./material-actions";
import { MaterialCutFields } from "./material-cut-fields";

export const MateriaForm = ({ material }: { material?: Material }) => {
  const form = useForm<z.infer<typeof materialSchema>>({
    resolver: zodResolver(materialSchema),
    defaultValues: materialDefaultValues,
  });

  const { watch, setValue } = form;
  const measureType = watch("measureType");

  useEffect(() => {
    if (material) {
      form.reset(material);
      setValue("id", material.id);
    } else {
      form.reset(materialDefaultValues);
    }
  }, [material]);

  useEffect(() => {
    setValue("unit", measureMap[measureType]);
    if (measureType === "m2") setValue("measure", [0, 0]);
    if (measureType === "ml") setValue("measure", [0]);
    if (measureType === "un") setValue("measure", [1]);
  }, [measureType, setValue]);

  const onSubmit = (values: z.infer<typeof materialSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogBody className="grid grid-cols-4 items-start gap-3">
          <MaterialBasicFields />
        </DialogBody>
        <DialogBody className="flex items-start gap-3">
          {measureType === "m2" && (
            <>
              <FormField
                control={form.control}
                name="measure.0"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Comprimento</FormLabel>
                    <FormControl>
                      <NumericFormat
                        value={field.value}
                        onValueChange={(values) =>
                          field.onChange(values.floatValue ?? 0)
                        }
                        suffix={` ${measureMap["ml"]}`}
                        allowNegative={false}
                        decimalScale={0}
                        customInput={Input}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-title-light -mt-1 pt-9 text-base">x</div>
              <FormField
                control={form.control}
                name="measure.1"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Altura</FormLabel>
                    <FormControl>
                      <NumericFormat
                        value={field.value}
                        onValueChange={(values) =>
                          field.onChange(values.floatValue ?? 0)
                        }
                        suffix={` ${measureMap["m2"]}`}
                        allowNegative={false}
                        decimalScale={0}
                        customInput={Input}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          {measureType === "ml" && (
            <FormField
              control={form.control}
              name="measure.0"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Comprimento</FormLabel>
                  <FormControl>
                    <NumericFormat
                      value={field.value}
                      onValueChange={(values) =>
                        field.onChange(values.floatValue ?? 0)
                      }
                      suffix={` ${measureMap["ml"]}`}
                      allowNegative={false}
                      decimalScale={0}
                      customInput={Input}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="baseValue"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Valor base</FormLabel>
                <FormControl>
                  <NumericFormat
                    value={field.value}
                    onValueChange={(values) =>
                      field.onChange(values.floatValue ?? 0)
                    }
                    decimalScale={2}
                    fixedDecimalScale
                    decimalSeparator=","
                    thousandSeparator="."
                    prefix="R$ "
                    allowNegative={false}
                    customInput={Input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <InputDisabled className="mt-[1.375rem] w-full justify-center">
            Por: {measureType.toUpperCase()}
          </InputDisabled>
        </DialogBody>
        <MaterialCutFields />
        <MaterialActions />
      </form>
    </Form>
  );
};
