import type { ReactNode } from "react";
import { OrderMenu } from "./_components/order-menu";
import { SummaryBar } from "./_components/summary-bar";

export default function OrderLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="grow">
      <OrderMenu />
      {children}
      <SummaryBar />
    </div>
  );
}
