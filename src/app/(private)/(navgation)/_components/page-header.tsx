import { Icon } from "@/components/ui/icon";
import type { ReactNode } from "react";

export const PageHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-b-light flex items-center justify-between gap-6 border-b bg-white p-6">
      {children}
    </div>
  );
};

export const PageHeaderContent = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center gap-4">{children}</div>;
};

export const PageHeaderIcon = ({ name }: { name: string }) => {
  return <Icon name={name} size={28} className="text-red-default" />;
};

export const PageHeaderHeading = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-1">{children}</div>;
};

export const PageHeaderTitle = ({ children }: { children: ReactNode }) => {
  return <h6>{children}</h6>;
};

export const PageHeaderDescription = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <p>{children}</p>;
};

export const PageHeaderAction = ({ children }: { children: ReactNode }) => {
  return <div className="flex gap-3">{children}</div>;
};
