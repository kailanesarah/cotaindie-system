import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const FormGroup = ({ children }: { children: ReactNode }) => {
  return <div className="mt-4 flex flex-col gap-4">{children}</div>;
};

export const FormSection = ({ children }: { children?: ReactNode }) => {
  return (
    <section className={cn("border-b-light border-y bg-white p-6")}>
      <div className="mx-auto flex max-w-[58.25rem] flex-col gap-6">
        {children}
      </div>
    </section>
  );
};

export const FormEmptySection = () => {
  return (
    <div
      className={cn("border-b-light h-[5.75rem] border-y bg-white px-6 py-4")}
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

export const FormDescription = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export const FormSeparator = () => {
  return <Separator />;
};

export const FormContent = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};
