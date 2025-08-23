import type { ReactNode } from "react";
import { onlyGuestAction } from "../_actions/only-guest-action";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await onlyGuestAction();

  return <>{children}</>;
}
