"use client";

import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cx } from "class-variance-authority";
import { Icon } from "./icon";

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cx(
        "border-b-light placeholder:body-lighter rounded-default h-12 w-full border px-5 pb-0.5",
        className,
      )}
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  children,
  placeholder,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  placeholder?: string;
}) {
  return (
    <SelectPrimitive.Trigger
      {...props}
      data-slot="select-trigger"
      className={cn(
        "group border-b-light rounded-default flex h-[2.875rem] w-full cursor-pointer items-center justify-between gap-2 px-3",
        "overflow-hidden",
        className,
      )}
    >
      <span className="w-full truncate">
        <SelectPrimitive.Value
          placeholder={placeholder}
          className="w-full truncate text-left"
        />
      </span>
      <SelectPrimitive.Icon asChild>
        <Icon
          name="keyboard_arrow_down"
          size={20}
          className="-mr-1 transition-transform duration-200 group-data-[state=open]:rotate-180"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

interface SelectContentProps
  extends React.ComponentProps<typeof SelectPrimitive.Content> {
  classNameViewport?: string;
}

function SelectContent({
  className,
  children,
  position = "popper",
  classNameViewport,
  ...props
}: Readonly<SelectContentProps>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-b-light rounded-default relative z-50 mt-1 flex max-h-[20rem] w-full origin-(--radix-select-content-transform-origin) flex-col overflow-x-hidden overflow-y-auto border bg-white !p-0",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1",
            "p-1",
            classNameViewport,
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "rounded-default hover:bg-beige-light/50 relative flex w-full cursor-pointer items-center gap-2 px-5 py-3 select-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="ml-auto">
        <Icon name="check_small" size={20} className="text-red-default" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "rounded-default border-b-light text-title-light mx-1 mt-1 flex cursor-default items-center justify-center border bg-[#F4F4F0] py-1 shadow-[inset_0_-0.25rem_1.25rem_0_rgba(0,0,0,0.04),0_0.1875rem_0.3125rem_0_rgba(0,0,0,0.05)] hover:bg-[#F0F0EC]",
        className,
      )}
      {...props}
    >
      <Icon name="keyboard_arrow_up" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "rounded-default border-b-light text-title-light mx-1 mb-1 flex cursor-default items-center justify-center border bg-[#F4F4F0] py-1 shadow-[inset_0_-0.25rem_1.25rem_0_rgba(0,0,0,0.04),0_0.1875rem_0.3125rem_0_rgba(0,0,0,0.05)] hover:bg-[#F0F0EC]",
        className,
      )}
      {...props}
    >
      <Icon name="keyboard_arrow_down" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
