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
    <nav className="bg-black-default sticky top-0 z-10 flex h-[4.5rem] items-center justify-between px-4 py-4 pr-0 text-white shadow-[0_0_32px_0_rgba(0,0,0,0.16)] lg:h-[4.5625rem] lg:px-6 lg:pr-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="hidden cursor-pointer items-center lg:flex"
          onClick={handleClose}
        >
          <Icon name="close" size={40} />
        </button>
        <div className="flex min-w-0 items-center gap-3">
          {order && <Badge>{order.code}</Badge>}
          <h6 className="!text-title-dark truncate overflow-hidden text-ellipsis whitespace-nowrap">
            {menuTitle}
          </h6>
        </div>
      </div>
      <button
        type="button"
        className="border-l-b-dark relative flex h-[4.5rem] w-[4.5rem] cursor-pointer items-center justify-center border-l lg:hidden"
        onClick={handleClose}
      >
        <div className="bg-title-dark absolute h-[1px] w-8 rotate-45" />
        <div className="bg-title-dark absolute h-[1px] w-8 -rotate-45" />
      </button>
      <OrderMenuActions />
    </nav>
  );
};
