import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  "rounded-default inline-flex h-[1.625rem] items-center justify-center gap-[0.375rem] border px-[0.625rem] text-xs lg:text-[0.8125rem] font-semibold  whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "border-red-default/50 text-red-default bg-red-lightest",
        secondary: "bg-white border-b-light text-body-light",
        alert: "bg-yellow-light border-yellow-darker/25 text-yellow-darker",
        success: "bg-green-light text-green-default border-green-default/25",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge };
