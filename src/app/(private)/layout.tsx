import { requireSession } from "@/modules/auth/auth-utils";
import type { ReactNode } from "react";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await requireSession();

  return <>{children}</>;
}
