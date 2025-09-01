import { cn } from "@/lib/utils";

export const InputDisabled = ({
  className,
  children,
  ...props
}: Readonly<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      data-slot="input-disabled"
      className={cn(
        "rounded-default border-b-light text-title-light bg-body-darker inline-flex h-[2.875rem] items-center justify-start gap-2 border px-5 font-semibold whitespace-nowrap shadow-[inset_0_-0.25rem_1.25rem_0_rgba(0,0,0,0.04),0_0.1875rem_0.3125rem_0_rgba(0,0,0,0.05)] transition-all",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
