"use client";

import { Button } from "@/components/temp/button";
import { Calendar } from "@/components/temp/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/temp/popover";
import { cn } from "@/lib/utils";
import { format as formatDateFn } from "date-fns";
import { useState } from "react";
import { Icon } from "./icon";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  onBlur?: () => void;
  placeholder?: string;
  format?: string;
  allowFutureDates?: boolean;
}

export function DatePicker({
  value,
  onChange,
  onBlur,
  placeholder = "Pick a date",
  format = "MM/dd/yyyy",
  allowFutureDates = false,
}: Readonly<DatePickerProps>) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const [open, setOpen] = useState(false);

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onChange?.(date);
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          onBlur?.();
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className={cn("justify-between font-medium")}
        >
          {selectedDate ? (
            formatDateFn(selectedDate, format)
          ) : (
            <span>{placeholder}</span>
          )}
          <Icon name="calendar_today" size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="mt-2 w-[17.5rem] p-0"
        align="end"
        sideOffset={0}
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          disabled={(date) =>
            date < new Date("1900-01-01") ||
            (!allowFutureDates && date > new Date())
          }
          captionLayout="dropdown"
          required={false}
        />
      </PopoverContent>
    </Popover>
  );
}
