import { Icon } from "@/components/ui/icon";
import type { ReactNode } from "react";

export const PageHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-b-light flex flex-col justify-between gap-5 border-b bg-white px-4 py-6 lg:flex-row lg:items-center lg:gap-6 lg:px-6">
      {children}
    </div>
  );
};

export const PageHeaderContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      {children}
    </div>
  );
};

export const PageHeaderIcon = ({ name }: { name: string }) => {
  return <Icon name={name} size={28} className="text-red-default" />;
};

export const PageHeaderHeading = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-2 lg:gap-1">{children}</div>;
};

export const PageHeaderTitle = ({ children }: { children: ReactNode }) => {
  return <h6>{children}</h6>;
};

export const PageHeaderDescription = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <p className={className}>{children}</p>;
};

export const PageHeaderAction = ({ children }: { children: ReactNode }) => {
  return <div className="flex gap-3">{children}</div>;
};
