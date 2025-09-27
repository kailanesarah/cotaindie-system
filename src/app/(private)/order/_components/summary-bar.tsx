"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { statusMap } from "../../(navgation)/_constants/status-map";
import { useOrderStore } from "../_stores/order-store";
import { currencyFormatter } from "../_utils/currency-formatter";
import { calculateOrderSummary } from "../functions/order-summary";
import { SummaryTag } from "./summary-tag";

export const SummaryBar = () => {
  const { order } = useOrderStore();
  const { totalAmount, installmentValue, discountValue } =
    calculateOrderSummary(order);

  const totalWithDiscount = totalAmount - discountValue;

  const { status, advanceAmount = 0, installmentCount = 0 } = order;

  return (
    <div className="pointer-events-none fixed top-0 right-0 bottom-0 left-0 flex h-full w-full items-end">
      <div className="border-b-light pointer-events-auto flex min-h-[6.25rem] grow items-center border-t bg-white px-6 pt-5 pb-6 shadow-[0_0_32px_0_rgba(0,0,0,0.08)]">
        <div className="max-w-container-small mx-auto flex w-full items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h6>
                Valor total: {currencyFormatter.format(totalWithDiscount)}
              </h6>
              <SummaryTag variant={status}>
                {statusMap[status || "open"].text}
              </SummaryTag>
            </div>
            <div className="flex flex-wrap gap-2.5 text-[0.8125rem]">
              <span>
                Desconto aplicado de{" "}
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
              {installmentCount > 0 && (
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
          <Button>
            <Icon name="download" />
            Exportar orçamento
          </Button>
        </div>
      </div>
    </div>
  );
};
