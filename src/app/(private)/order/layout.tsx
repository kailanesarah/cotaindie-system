import type { ReactNode } from "react";

export default function OrderLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className="grow">{children}</div>;
}
