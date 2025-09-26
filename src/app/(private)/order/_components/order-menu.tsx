"use client";

import { OrderMenuActions } from "@/app/(private)/order/_components/order-menu-actions";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { ROUTES } from "@/constants/urls";
import { useRouter } from "next/navigation";

export const OrderMenu = ({ order }: { order?: Order }) => {
  const router = useRouter();

  const handleClose = () => {
    if (window.opener) {
      window.close();
    } else {
      router.push(ROUTES.PRIVATE.ORDERS);
    }
  };

  const menuTitle = order ? "Editar orçamento" : "Adicionar novo orçamento";

  return (
    <nav className="bg-black-default z-10 flex h-[4.5625rem] items-center justify-between px-6 py-4 text-white shadow-[0_0_32px_0_rgba(0,0,0,0.16)]">
      <div className="flex items-center gap-4">
        <button
          className="flex cursor-pointer items-center"
          onClick={handleClose}
        >
          <Icon name="close" size={40} />
        </button>
        <div className="flex items-center gap-3">
          {order && <Badge>{order.code}</Badge>}
          <h6 className="!text-title-dark">{menuTitle}</h6>
        </div>
      </div>
      <OrderMenuActions />
    </nav>
  );
};
