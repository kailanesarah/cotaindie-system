"use client";

import { DialogBody } from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icon } from "@/components/ui/icon";
import { InputDisabled } from "@/components/ui/input-disabled";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { cutDirectionMap } from "../_utils/cut-direction-map";

export const MaterialCutFields = () => {
  const form = useFormContext();
  const measureType = form.watch("measureType");

  if (measureType !== "M2") return;

  const cutDirection = form.watch("cutDirection") as "VH" | "V";

  return (
    <DialogBody className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:items-start">
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
    </DialogBody>
  );
};
