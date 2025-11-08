"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale";
import { useEffect, useRef } from "react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";
import { Icon } from "./icon";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,

        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        "w-full",
        className,
      )}
      locale={ptBR}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("pt-BR", { month: "short" }),
        ...formatters,

        formatWeekdayName: (day) => {
          const weekday = day.toLocaleDateString("pt-BR", { weekday: "long" });
          return weekday.charAt(0).toUpperCase() + weekday.slice(1, 3);
        },
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-0 flex-col md:flex-row relative",
          defaultClassNames.months,
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          "rounded-default border-b-light text-title-light flex cursor-default items-center justify-center border bg-[#F4F4F0] shadow-[inset_0_-0.25rem_1.25rem_0_rgba(0,0,0,0.04),0_0.1875rem_0.3125rem_0_rgba(0,0,0,0.05)] hover:bg-[#F0F0EC] cursor-pointer p-0",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          "rounded-default border-b-light text-title-light flex cursor-default items-center justify-center border bg-[#F4F4F0] shadow-[inset_0_-0.25rem_1.25rem_0_rgba(0,0,0,0.04),0_0.1875rem_0.3125rem_0_rgba(0,0,0,0.05)] hover:bg-[#F0F0EC] cursor-pointer p-0",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "w-full flex items-center justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring has-focus:ring-ring/50 has-focus:ring-[3px]",
          "rounded-default border-b-light text-title-light flex cursor-default items-center justify-center border bg-[#F4F4F0] shadow-[inset_0_-0.25rem_1.25rem_0_rgba(0,0,0,0.04),0_0.1875rem_0.3125rem_0_rgba(0,0,0,0.05)] hover:bg-[#F0F0EC] cursor-pointer p-0",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays: cn(
          "flex gap-0 text-title-light text-xs",
          defaultClassNames.weekdays,
        ),
        weekday: cn(
          "flex-1 text-[0.8rem] select-none mb-2",
          defaultClassNames.weekday,
        ),
        week: cn("flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header,
        ),
        week_number: cn("select-none", defaultClassNames.week_number),
        day: cn(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          defaultClassNames.day,
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start,
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "rounded-default border-b-light text-title-light flex cursor-default items-center justify-center border bg-[#F4F4F0] shadow-[inset_0_-0.25rem_1.25rem_0_rgba(0,0,0,0.04),0_0.1875rem_0.3125rem_0_rgba(0,0,0,0.05)] hover:bg-[#F0F0EC] cursor-pointer p-0",
          defaultClassNames.today,
        ),
        outside: cn(
          "aria-selected:text-muted-foreground",
          defaultClassNames.outside,
        ),
        disabled: cn("opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <Icon
                name="keyboard_arrow_left"
                className={cn("mr-1 mb-1.5 size-4 cursor-pointer", className)}
                {...props}
              />
            );
          }

          if (orientation === "right") {
            return (
              <Icon
                name="keyboard_arrow_right"
                className={cn("mr-1 mb-1.5 size-4 cursor-pointer", className)}
                {...props}
              />
            );
          }

          return (
            <Icon
              name="keyboard_arrow_down"
              className={cn("size-4", className)}
              {...props}
            />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="secondary"
      square
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-red-lightest data-[selected-single=true]:text-red-default data-[selected-single=true]:border-red-default data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground dark:hover:text-accent-foreground rounded-default flex aspect-square size-9 w-full min-w-(--cell-size) flex-col gap-1 leading-none font-medium group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md data-[selected-single=true]:border data-[selected-single=true]:font-semibold [&>span]:opacity-60",
        "border-0 bg-transparent shadow-none",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
