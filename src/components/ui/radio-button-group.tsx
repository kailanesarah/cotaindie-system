import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { useId } from "react";

export const RadioButtonGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) => {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn(
        "inline-flex overflow-hidden",
        "[&>*:first-child>label]:rounded-l-default [&>*:first-child>label]:rounded-r-none",
        "[&>*:last-child>label]:rounded-r-default [&>*:last-child>label]:rounded-l-none",
        "[&>*:not(:first-child):not(:last-child)>label]:rounded-none",
        "w-full [&>*:not(:first-child)>label]:-ml-px",
        className,
      )}
      {...props}
    />
  );
};

export const RadioButton = ({
  className,
  value,
  children,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) => {
  const id = useId();

  return (
    <div className="grow">
      <RadioGroupPrimitive.Item
        data-slot="radio-group-item"
        value={value}
        id={id}
        className="peer hidden"
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="relative flex items-center justify-center"
        ></RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <Label
        htmlFor={id}
        className={cn(
          "rounded-default border-b-light text-title-light relative inline-flex h-[2.875rem] cursor-pointer items-center justify-start gap-2 border bg-[#E5E5E235] px-5 whitespace-nowrap shadow-[inset_0_-0.25rem_1.25rem_0_rgba(0,0,0,0.04),0_0.1875rem_0.3125rem_0_rgba(0,0,0,0.05)] transition-all",
          "peer-data-[state=checked]:border-red-default peer-data-[state=checked]:text-red-default peer-data-[state=checked]:bg-red-lightest w-full grow peer-data-[state=checked]:z-10",
          className,
        )}
      >
        {children}
      </Label>
    </div>
  );
};
