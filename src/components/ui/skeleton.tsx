import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("rounded-default bg-b-light/25 animate-pulse", className)}
      {...props}
    />
  );
}

export { Skeleton };
