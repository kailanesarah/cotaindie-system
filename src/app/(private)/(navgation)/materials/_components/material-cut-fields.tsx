"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/temp/form";
import { Icon } from "@/components/temp/icon";
import { InputDisabled } from "@/components/temp/input-disabled";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/temp/select";
import { useFormContext } from "react-hook-form";
import { cutDirectionMap } from "../_utils/cut-direction-map";

export const MaterialCutFields = () => {
  const form = useFormContext();
  const measureType = form.watch("measureType");

  if (measureType !== "M2") return;

  const cutDirection = form.watch("cutDirection") as "VH" | "V";

  return (
    <>
      <FormField
        control={form.control}
        name="cutDirection"
        render={({ field }) => (
          <FormItem className="col-span-1">
            <FormLabel>Sentido de corte</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                value={field.value || "VH"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o sentido de corte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VH">{cutDirectionMap["VH"]}</SelectItem>
                  <SelectItem value="V">{cutDirectionMap["V"]}</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <InputDisabled className="col-span-1 lg:mt-[1.375rem]">
        <Icon
          name={
            form.watch("cutDirection") === "VH"
              ? "grid_on"
              : "calendar_view_week"
          }
        />
        {cutDirectionMap[cutDirection]}
      </InputDisabled>
    </>
  );
};
