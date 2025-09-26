import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { statusMap } from "../../(navgation)/_constants/status-map";
import { SummaryTag } from "./summary-tag";

export const SummaryBar = () => {
  return (
    <div className="pointer-events-none fixed top-0 right-0 bottom-0 left-0 flex h-full w-full items-end">
      <div className="border-b-light pointer-events-auto flex min-h-[6.25rem] grow items-center border-t bg-white px-6 pt-5 pb-6 shadow-[0_0_32px_0_rgba(0,0,0,0.08)]">
        <div className="max-w-container-small mx-auto flex w-full items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h6>Valor total: R$ 8.331,50</h6>
              <SummaryTag variant="approved">
                {statusMap["approved"].text}
              </SummaryTag>
            </div>
            <div className="text-[0.8125rem]">
              Desconto aplicado de 10% - R$ 833,15 | Adiantamento: R$ 2.112,29 |
              +3 parcelas de R$ 2.432,29
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
