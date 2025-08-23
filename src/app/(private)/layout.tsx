import type { ReactNode } from "react";
import { onlyUsersAction } from "../_actions/only-users-action";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await onlyUsersAction();

  return <>{children}</>;
}
