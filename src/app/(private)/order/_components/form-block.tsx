import { Separator } from "@/components/temp/separator";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const FormGroup = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-3 flex flex-col gap-3 lg:mt-4 lg:gap-4">{children}</div>
  );
};

export const FormSection = ({ children }: { children?: ReactNode }) => {
  return (
    <section className={cn("border-b-light border-y bg-white p-4 lg:p-6")}>
      <div className="max-w-container-small mx-auto flex flex-col gap-5 lg:gap-6">
        {children}
      </div>
    </section>
  );
};

export const FormEmptySection = () => {
  return (
    <div
      className={cn(
        "border-b-light h-[5rem] border-y bg-white px-6 py-4 text-center lg:h-[6.25rem]",
      )}
    />
  );
};

export const FormHeading = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

export const FormTitle = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-title-light text-[1.0625rem] font-semibold">
      {children}
    </div>
  );
};

export const FormDescription = ({ children }: { children?: ReactNode }) => {
  return <div>{children}</div>;
};

export const FormSeparator = ({ className }: { className?: string }) => {
  return <Separator className={className} />;
};

export const FormContent = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};
