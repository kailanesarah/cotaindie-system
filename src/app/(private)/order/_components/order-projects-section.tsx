"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrderStore } from "../_stores/order-store";
import {
  OrderProjectsActions,
  OrderProjectsContent,
  OrderProjectsTotal,
} from "./order-projects";
import { SummaryTable } from "./summary-table";

export const OrderProjectsSection = () => {
  const loading = useOrderStore((state) => state.loading);

  if (loading) {
    return (
      <OrderProjectsContent>
        <div className="flex w-full flex-col gap-3">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      </OrderProjectsContent>
    );
  }

  return (
    <>
      <OrderProjectsContent>
        <SummaryTable />
        <OrderProjectsActions />
      </OrderProjectsContent>
      <OrderProjectsTotal />
    </>
  );
};
