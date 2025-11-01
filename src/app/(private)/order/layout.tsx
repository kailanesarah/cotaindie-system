import type { ReactNode } from "react";
import {
  FavButtonWrapper,
  OptionsButton,
  SaveButton,
} from "./_components/fav-button";
import { OrderMenu } from "./_components/order-menu";
import { SummaryBar } from "./_components/summary-bar";

interface OrderLayoutProps {
  children: ReactNode;
}

export default async function OrderLayout({
  children,
}: Readonly<OrderLayoutProps>) {
  return (
    <div className="grow">
      <OrderMenu />
      {children}
      <FavButtonWrapper>
        <OptionsButton />
        <SaveButton />
      </FavButtonWrapper>
      <SummaryBar />
    </div>
  );
}
