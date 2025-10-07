import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:body-lighter border-b-light rounded-default flex h-[2.875rem] w-full border bg-[#E5E5E235] px-4 shadow-[inset_0_0.1875rem_0.3125rem_0_rgba(0,0,0,0.04)] lg:px-5",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
