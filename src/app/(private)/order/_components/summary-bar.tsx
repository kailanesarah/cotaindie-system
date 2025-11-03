"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { statusMap } from "../../(navgation)/_constants/status-map";
import { useOrderStore } from "../_stores/order-store";
import { currencyFormatter } from "../_utils/currency-formatter";
import { calculateOrderSummary } from "../functions/order-summary";
import { SummaryTag } from "./summary-tag";

export const SummaryBar = () => {
  const { order, setStatusInfo } = useOrderStore();
  const { totalAmount, installmentValue, discountValue } =
    calculateOrderSummary(order);

  const totalWithDiscount = totalAmount - discountValue;
  const { status, advanceAmount = 0, installmentCount = 0 } = order;

  const isSmallScreen = useMediaQuery("(max-width: 1023px)");

  return (
    <div className="pointer-events-none fixed top-0 right-0 bottom-0 left-0 flex h-full w-full items-end">
      <div className="border-b-light pointer-events-auto flex min-h-[5rem] grow items-center border-t bg-white px-4 pt-4 pb-4 shadow-[0_0_32px_0_rgba(0,0,0,0.08)] lg:min-h-[6.25rem] lg:px-6 lg:pt-5 lg:pb-6">
        <div className="max-w-container-small mx-auto flex w-full items-center justify-between gap-3 lg:gap-6">
          <div className="flex flex-col gap-1 lg:gap-2">
            <div className="flex items-center gap-2">
              <h6 className="!text-base lg:!text-xl">
                <span className="lg:hidden">Total</span>
                <span className="hidden lg:inline">Valor total:</span>{" "}
                {currencyFormatter.format(totalWithDiscount)}
              </h6>
              <SummaryTag variant={status} className="hidden lg:flex">
                {statusMap[status || "OPEN"].text}
              </SummaryTag>
            </div>
            <div className="flex flex-wrap gap-2.5 text-[0.8125rem]">
              <span>
                Desconto <span className="hidden lg:inline">aplicado de</span>{" "}
                {((order.discountPercent || 0) * 100).toFixed(2)}% -{" "}
                {currencyFormatter.format(discountValue)}
              </span>
              {advanceAmount > 0 && (
                <>
                  <span>|</span>
                  <span>
                    Adiantamento: {currencyFormatter.format(advanceAmount)}
                  </span>
                </>
              )}
              {installmentCount > 0 && installmentValue > 0 && (
                <>
                  <span>|</span>
                  <span>
                    {installmentCount} parcelas de{" "}
                    {currencyFormatter.format(installmentValue)}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-3">
            <Select
              value={order.status ?? undefined}
              onValueChange={(value) =>
                setStatusInfo({ status: value as Status })
              }
            >
              <Button variant="secondary" asChild>
                <SelectTrigger
                  className="outline-0 lg:hidden"
                  placeholder="Status"
                >
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
              </Button>
              <SelectContent
                align="end"
                className="divide-x divide-gray-300"
                classNameViewport="px-0"
                sideOffset={8}
              >
                <SelectItem
                  value="OPEN"
                  className="text-yellow-darker font-semibold outline-0"
                >
                  Cotado
                </SelectItem>
                <Separator />
                <SelectItem
                  value="APPROVED"
                  className="text-green-default font-semibold outline-0"
                >
                  Finalizado
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              square={isSmallScreen}
              className={cn(isSmallScreen && "px-0")}
            >
              <Icon name="download" />
              <span className="hidden lg:inline">Exportar orçamento</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
