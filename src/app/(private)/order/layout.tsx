import { ROUTES } from "@/constants/urls";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { hasItemsActions } from "../_actions/has-items-action";
import {
  FavButtonWrapper,
  OptionsButton,
  SaveButton,
} from "./_components/fav-button";
import { SummaryBar } from "./_components/summary-bar";

interface OrderLayoutProps {
  children: ReactNode;
}

export default async function OrderLayout({
  children,
}: Readonly<OrderLayoutProps>) {
  const { has_clients, has_materials } = await hasItemsActions();

  if (!has_clients || !has_materials) {
    redirect(ROUTES.PRIVATE.ORDERS);
  }

  return (
    <div className="grow">
      {children}
      <FavButtonWrapper>
        <OptionsButton />
        <SaveButton />
      </FavButtonWrapper>
      <SummaryBar />
    </div>
  );
}
