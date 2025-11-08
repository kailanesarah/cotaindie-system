import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "rounded-default border inline-flex h-[2.875rem] items-center justify-center transition-all gap-2 px-5 font-semibold whitespace-nowrap cursor-pointer disabled:pointer-events-none ",
  {
    variants: {
      variant: {
        primary:
          "bg-red-default text-white shadow-[inset_0_0.0625rem_0.0625rem_0_rgba(255,255,255,0.20),inset_0_0.375rem_0.75rem_0_rgba(255,255,255,0.12),0_0.0625rem_0.125rem_0_rgba(8,8,8,0.20),0_0.25rem_0.25rem_0_rgba(8,8,8,0.08)] hover:bg-red-dark active:bg-red-darker border-red-default",
        secondary:
          "bg-[#F4F4F0] border-b-light text-title-light shadow-[inset_0_-0.25rem_1.25rem_0_rgba(0,0,0,0.04),0_0.1875rem_0.3125rem_0_rgba(0,0,0,0.05)] hover:bg-[#F0F0EC]",
        destructive:
          "bg-black-default text-white shadow-[inset_0_0.0625rem_0.0625rem_0_rgba(255,255,255,0.20),inset_0_0.375rem_0.75rem_0_rgba(255,255,255,0.12),0_0.0625rem_0.125rem_0_rgba(8,8,8,0.20),0_0.25rem_0.25rem_0_rgba(8,8,8,0.08)] hover:bg-black-light  border-black-default",
        outline: "border-b-light text-title-light hover:border-black-light",
        link: "text-title-light border-none hover:bg-beige-light/0 p-0.5 h-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export function Button({
  className,
  variant,
  asChild = false,
  type = "button",
  form,
  square = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    square?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      type={type}
      data-slot="button"
      form={form}
      className={cn(
        buttonVariants({ variant }),
        square && "max-w-[2.875rem] min-w-[2.875rem] p-0",
        className,
      )}
      {...props}
    />
  );
}
