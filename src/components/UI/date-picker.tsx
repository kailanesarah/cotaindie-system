"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format as formatDateFn } from "date-fns";
import { useState } from "react";
import { Icon } from "./icon";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  format?: string;
  allowFutureDates?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  format = "MM/dd/yyyy",
  allowFutureDates = false,
}: Readonly<DatePickerProps>) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

  const handleSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    onChange?.(date);
  };

  return (
    <Popover>
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
        className="6 mt-2 w-[17.5rem] p-0"
        align="end"
        sideOffset={0}
      >
        <Calendar
          className=""
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
