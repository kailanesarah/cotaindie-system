import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "rounded-default inline-flex h-[1.625rem] items-center justify-center gap-[0.375rem] border px-[0.625rem] text-[0.8125rem] font-semibold",
  {
    variants: {
      variant: {
        primary: "border-red-default/50 text-red-default bg-red-lightest",
        secondary: "bg-white border-b-light text-body-light",
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
