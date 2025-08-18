import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:body-lighter border-b-light rounded-default flex h-[2.875rem] max-h-[7.5rem] min-h-[5rem] w-full border bg-[#E5E5E235] px-5 py-4 shadow-[inset_0_0.1875rem_0.3125rem_0_rgba(0,0,0,0.04)]",
        className,
      )}
      {...props}
    />
  );
}
