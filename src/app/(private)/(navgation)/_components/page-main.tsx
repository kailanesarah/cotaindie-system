import type { ReactNode } from "react";

export const PageMain = ({ children }: { children: ReactNode }) => {
  return <main className="flex grow flex-col">{children}</main>;
};
