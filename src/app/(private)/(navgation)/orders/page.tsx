import { ScrollArea } from "@/components/ui/scroll-area";
import { hasItemsActions } from "../../_actions/has-items-action";
import { PageContent } from "../_components/page-content";
import {
  PageHeader,
  PageHeaderAction,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderIcon,
  PageHeaderTitle,
} from "../_components/page-header";
import { PageMain } from "../_components/page-main";
import { SearchPagination } from "../_components/pagination";
import {
  SearchBar,
  SearchSortPeriod,
  SearchSortWrap,
  SearchTextFilter,
  SelectFilter,
} from "../_components/search-bar";
import { DialogProvider } from "../_context/dialog-provider";
import { SearchProvider } from "../_context/search-provider";
import { AddClientCard } from "../clients/_components/add-client-card";
import { AddMaterialsCard } from "../materials/_components/add-materials-card";
import { AddOrderButton } from "./_components/add-order-button";
import { AddOrderCard } from "./_components/add-order-card";
import { OrderSearchContent } from "./_components/order-search-content";
import { SelectClients } from "./_components/select-clients";
import { statusList } from "./_constants/status-list";

export default async function OrdersPage() {
  const { has_orders, has_clients, has_materials } = await hasItemsActions();

  return (
    <DialogProvider>
      <PageMain>
        <PageHeader>
          <PageHeaderContent>
            <PageHeaderIcon name="document_scanner" />
            <PageHeaderHeading>
              <PageHeaderTitle>Orçamentos e status dos pedidos</PageHeaderTitle>
              <PageHeaderDescription>
                Administre os orçamentos e a finalização dos pedidos de forma
                centralizada.
              </PageHeaderDescription>
            </PageHeaderHeading>
          </PageHeaderContent>
          {has_orders && has_clients && has_materials && (
            <PageHeaderAction>
              <AddOrderButton>Novo orçamento</AddOrderButton>
            </PageHeaderAction>
          )}
        </PageHeader>
        <SearchProvider>
          {has_orders && (
            <SearchBar>
              <SearchTextFilter />
              <SearchSortWrap>
                <SelectFilter
                  deafultText="Todos os status"
                  filterKey="status"
                  options={statusList}
                />
                <SelectClients />
                <SearchSortPeriod />
              </SearchSortWrap>
            </SearchBar>
          )}
          <ScrollArea className="flex grow items-stretch px-0">
            <PageContent className="flex max-w-dvw grow flex-col px-0 !py-0 lg:px-0">
              {!has_materials && (
                <AddMaterialsCard className="mx-4 mt-4 lg:mx-6 lg:mt-6" />
              )}
              {!has_clients && (
                <AddClientCard className="mx-4 my-4 lg:mx-6 lg:my-6" />
              )}

              {has_orders && has_clients && has_materials && (
                <OrderSearchContent />
              )}
              {!has_orders && has_clients && has_materials && (
                <AddOrderCard className="mx-4 my-4 lg:mx-6 lg:my-6" />
              )}
            </PageContent>
          </ScrollArea>
          {has_orders && <SearchPagination />}
        </SearchProvider>
      </PageMain>
    </DialogProvider>
  );
}
