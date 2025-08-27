import type { ReactNode } from "react";

export const PageContent = ({ children }: { children: ReactNode }) => {
  return <div className="px-6 py-4">{children}</div>;
};
