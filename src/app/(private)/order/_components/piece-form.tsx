"use client";

import { DialogBody } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormList,
  FormListItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputDisabled } from "@/components/ui/input-disabled";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useRef } from "react";
import {
  useFieldArray,
  useForm,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import { NumericFormat } from "react-number-format";
import type z from "zod";
import { measureMap } from "../../(navgation)/_constants/mesure-map";
import { materials } from "../../(navgation)/materials/_constants/material-list";
import { formatMeasure } from "../_utils/format-measure";
import {
  getPiecetDefaultValues,
  pieceSchema,
} from "../schema/piece-form-schema";
import { PieceFormActions } from "./piece-form-actions";

export const PieceForm = ({
  formParent,
}: {
  formParent: UseFormReturn<FieldValues, any, FieldValues>;
}) => {
  const id = useId();

  const form = useForm<z.infer<typeof pieceSchema>>({
    resolver: zodResolver(pieceSchema),
    defaultValues: getPiecetDefaultValues(),
  });

  const { watch, setValue } = form;

  const measureType = watch("material.measureType");
  const unit = watch("material.unit");
  const measure = watch("material.measure");

  const material = watch("material.name");

  const isFirstRender = useRef(true);
  const previousMeasureType = useRef(measureType);

  useEffect(() => {
    if (!isFirstRender.current && previousMeasureType.current !== measureType) {
      if (measureType === "m2") setValue("measure", [0, 0]);
      if (measureType === "ml") setValue("measure", [0]);
      if (measureType === "un") setValue("measure", [1]);
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    previousMeasureType.current = measureType;
  }, [measureType]);

  const { append } = useFieldArray({
    control: formParent.control,
    name: "pieces",
  });

  const onSubmit = async (values: z.infer<typeof pieceSchema>) => {
    const isValid = await form.trigger();

    if (!isValid) return;

    append(values);
    form.reset(getPiecetDefaultValues());
  };

  return (
    <Form {...form}>
      <form id={id}>
        <DialogBody className="grid grid-cols-6 items-start gap-3">
          <FormField
            control={form.control}
            name="material.name"
            render={({ field }) => (
              <FormItem className="col-span-4">
                <FormLabel>Material</FormLabel>
                <FormControl>
                  <Select
                    value={
                      materials.find((opt) => opt.name === field.value)?.id ??
                      ""
                    }
                    onValueChange={(value) => {
                      const selectedMaterial = materials.find(
                        (opt) => opt.id === value,
                      );
                      if (selectedMaterial) {
                        form.setValue("material.id", selectedMaterial.id, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        form.setValue("material.name", selectedMaterial.name, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        form.setValue(
                          "material.measureType",
                          selectedMaterial.measureType,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                          },
                        );
                        form.setValue(
                          "material.measure",
                          selectedMaterial.measure,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                          },
                        );
                        form.setValue(
                          "material.baseValue",
                          selectedMaterial.baseValue,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                          },
                        );
                        form.setValue("material.unit", selectedMaterial.unit, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        form.setValue(
                          "material.wasteTax",
                          selectedMaterial.wasteTax,
                          {
                            shouldValidate: true,
                            shouldDirty: true,
                          },
                        );
                      }
                    }}
                  >
                    <SelectTrigger
                      truncate
                      placeholder="Selecione um material"
                      className="justify-between"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="end">
                      {materials.map((opt) => (
                        <SelectItem key={opt.id} value={opt.id}>
                          {opt.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                {material && (
                  <FormList>
                    <FormListItem>
                      {formatMeasure(measure, unit, measureType)}
                    </FormListItem>
                  </FormList>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="material.baseValue"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Valor base</FormLabel>
                <FormControl>
                  <NumericFormat
                    value={field.value ?? ""}
                    onValueChange={(values) =>
                      field.onChange(values.floatValue ?? 0)
                    }
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale
                    prefix="R$ "
                    allowNegative={false}
                    customInput={Input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {material && measureType !== "un" && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>Nome da peça</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Peça do local..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="qtde"
            render={({ field }) => (
              <FormItem
                className={cn(
                  "col-span-6",
                  material && measureType !== "un" && "col-span-2",
                )}
              >
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger
                      truncate
                      placeholder="Qtde..."
                      className="justify-between"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="end">
                      {Array.from({ length: 10 }).map((_, index) => {
                        const value = index + 1;
                        return (
                          <SelectItem key={value} value={String(value)}>
                            {value}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </DialogBody>
        {measureType && (
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
                          decimalScale={3}
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
                          field.onChange(values.floatValue ?? 10)
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
            <InputDisabled
              className={cn("w-full", measureType !== "un" && "mt-[1.375rem]")}
            >
              Unidade: {measureType}
            </InputDisabled>
          </DialogBody>
        )}
        <PieceFormActions onSubmit={() => onSubmit(form.getValues())} />
      </form>
    </Form>
  );
};
