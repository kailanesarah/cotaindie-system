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
import { cutMap } from "../../_constants/cut-map";

export const MaterialCutFields = () => {
  const form = useFormContext();
  const measureType = form.watch("measureType");

  if (measureType !== "m2") return;

  const cutDirection = form.watch("cutDirection") as "v" | "vh" | undefined;
  const cutLabel = cutMap[cutDirection ?? "vh"];

  return (
    <DialogBody className="grid grid-cols-2 items-start gap-3">
      <FormField
        control={form.control}
        name="cutDirection"
        render={({ field }) => (
          <FormItem className="col-span-1">
            <FormLabel>Sentido de corte</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                value={field.value || "vh"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o sentido de corte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vh">Vertical e horizontal</SelectItem>
                  <SelectItem value="v">Vertical</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <InputDisabled className="col-span-1 mt-[1.375rem] justify-center">
        <Icon
          name={
            form.watch("cutDirection") === "vh"
              ? "grid_on"
              : "calendar_view_week"
          }
        />
        {cutLabel}
      </InputDisabled>
    </DialogBody>
  );
};
