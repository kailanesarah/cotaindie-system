"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputDisabled } from "@/components/ui/input-disabled";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { measureMap } from "../../_constants/mesure-map";

export const MaterialDinamicFields = () => {
  const form = useFormContext();

  const { watch, setValue } = form;
  const measureType = watch("measureType") as keyof typeof measureMap;

  const isFirstRender = useRef(true);
  const previousMeasureType = useRef(measureType);

  useEffect(() => {
    setValue("unit", measureMap[measureType]);

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

  return (
    <>
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
    </>
  );
};
