import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const PageContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={cn("grow px-6 py-4", className)}>{children}</div>;
};
