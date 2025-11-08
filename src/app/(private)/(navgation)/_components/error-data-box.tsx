"use client";

import { Icon } from "@/components/temp/icon";
import { cn } from "@/lib/utils";
import { useSearchContext } from "../_context/search-provider";

interface ErrorDataBoxProps {
  className?: string;
}

export const ErrorDataBox = ({ className }: ErrorDataBoxProps) => {
  const { error, loading, data } = useSearchContext();

  if (!error || loading || data) return null;

  return (
    <div
      className={cn(
        "rounded-default border-b-light flex flex-col items-center gap-6 border bg-white p-4 text-center lg:p-6 lg:pb-10",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <Icon name="error_outline" className="text-red-default" size={28} />
        <div className="text-title-light text-base font-semibold">
          Ocorreu um erro
        </div>
        <p>{error}</p>
      </div>
    </div>
  );
};
