import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const summaryTagVariants = cva(
  "flex h-5 items-center rounded-full px-2.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        APPROVED: "bg-green-light text-green-default",
        OPEN: "bg-yellow-light text-yellow-darker",
      },
    },
    defaultVariants: {
      variant: "OPEN",
    },
  },
);

interface ISummaryTag
  extends React.ComponentProps<"div">,
    VariantProps<typeof summaryTagVariants> {
  children: ReactNode;
}

export const SummaryTag = ({
  children,
  variant = "OPEN",
  className,
  ...props
}: ISummaryTag) => {
  return (
    <div className={cn(summaryTagVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
};
