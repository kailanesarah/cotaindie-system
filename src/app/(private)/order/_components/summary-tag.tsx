import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

const summaryTagVariants = cva(
  "flex h-5 items-center rounded-full px-2.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        approved: "bg-green-light text-green-default",
        open: "bg-yellow-light text-yellow-darker",
      },
    },
    defaultVariants: {
      variant: "open",
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
  variant = "open",
  className,
  ...props
}: ISummaryTag) => {
  return (
    <div className={cn(summaryTagVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
};
