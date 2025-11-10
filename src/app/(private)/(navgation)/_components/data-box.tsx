"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const DataBox = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-default flex flex-col items-center gap-6 bg-white p-4 text-center lg:p-6 lg:pb-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const DataBoxContent = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col items-center gap-2">{children}</div>
);

export const DataBoxTitle = ({ children }: { children: ReactNode }) => (
  <div className="text-title-light text-base font-semibold">{children}</div>
);

export const DataBoxDescription = ({ children }: { children: ReactNode }) => (
  <p>{children}</p>
);
