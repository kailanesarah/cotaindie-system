"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const LoadingBox = ({ className }: { className?: string }) => {
  return (
    <div className={cn("mb-auto flex flex-col gap-3 p-3 lg:p-6", className)}>
      <Skeleton className="h-9 w-2/3 rounded-md" />
      <Skeleton className="h-6 w-5/6 rounded-md" />
      <Skeleton className="h-6 w-full rounded-md" />
    </div>
  );
};
