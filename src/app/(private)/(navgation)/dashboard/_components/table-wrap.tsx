import type { ReactNode } from "react";

export const TableWrap = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-3">{children}</div>;
};

export const TableTitle = ({ children }: { children: ReactNode }) => {
  return <span className="text-title-light font-semibold">{children}</span>;
};

export const TableContent = ({ children }: { children: ReactNode }) => {
  return <div className="rounded-default overflow-hidden">{children}</div>;
};
