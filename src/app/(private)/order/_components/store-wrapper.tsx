"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useGetOrderById } from "../_hooks/use-get-order-by-id";
import { useOrderStore } from "../_stores/order-store";

interface OrderStoreWrapperProps {
  id?: string;
  children: ReactNode;
}

export function OrderStoreWrapper({
  id = "",
  children,
}: Readonly<OrderStoreWrapperProps>) {
  const setOrderFull = useOrderStore((state) => state.setOrderFull);
  const setLoading = useOrderStore((state) => state.setLoading);

  const [key, setKey] = useState<string | number>(0);

  const { data } = useGetOrderById({ id });
  useEffect(() => {
    if (data) {
      setOrderFull(data);
      setKey(data.id);

      setLoading(false);
    }
  }, [data]);

  if (!id) return <>{children}</>;

  return <div key={key}>{children}</div>;
}
