import type { ReactNode } from "react";
import { onlyUsersAction } from "../_actions/only-users-action";
import { DialogProvider } from "./(navgation)/_context/dialog-provider";
import { QueryProvider } from "./(navgation)/_context/query-provider";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await onlyUsersAction();

  return (
    <QueryProvider>
      <DialogProvider>{children}</DialogProvider>
    </QueryProvider>
  );
}
