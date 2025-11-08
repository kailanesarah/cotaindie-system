"use client";

import { Icon } from "@/components/ui/icon";
import {
  DataBox,
  DataBoxContent,
  DataBoxDescription,
  DataBoxTitle,
} from "./data-box";

interface ErrorDataBoxProps {
  error: string;
  className?: string;
}

export const ErrorDataBox = ({ error, className }: ErrorDataBoxProps) => {
  return (
    <DataBox className={className}>
      <DataBoxContent>
        <Icon name="error_outline" className="text-red-default" size={28} />
        <DataBoxTitle>Ocorreu um erro</DataBoxTitle>
        <DataBoxDescription>{error}</DataBoxDescription>
      </DataBoxContent>
    </DataBox>
  );
};
