import type { ReactNode } from "react";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <>{children}</>;
}
