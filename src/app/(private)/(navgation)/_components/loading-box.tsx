"use client";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { useSearchContext } from "../_context/search-provider";

export const LoadingBox = ({ className }: { className?: string }) => {
  const { loading } = useSearchContext();

  if (!loading) return;

  return (
    <div
      className={cn(
        "rounded-default border-b-light flex h-full grow flex-col items-center justify-center gap-6 border-[1.5px] border-dashed p-4 lg:p-6",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <Icon
          name="cached"
          className="text-red-default animate-spin"
          size={24}
        />
        <div className="text-title-light text-base font-semibold">
          Carregando...
        </div>
      </div>
    </div>
  );
};
