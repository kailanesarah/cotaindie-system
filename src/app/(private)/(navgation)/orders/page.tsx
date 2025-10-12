import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyDataBox } from "../_components/empty-data-box";
import { ErrorDataBox } from "../_components/error-data-box";
import { LoadingBox } from "../_components/loading-box";
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
import { SearchProvider } from "../_context/search-provider";
import { clients } from "../clients/_constants/clients-list";
import { AddOrderButton } from "./_components/add-order-button";
import { OrderTable } from "./_components/order-table";
import { statusList } from "./_constants/status-list";

export default async function OrdersPage() {
  return (
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
        <PageHeaderAction>
          <AddOrderButton>Novo orçamento</AddOrderButton>
        </PageHeaderAction>
      </PageHeader>
      <SearchProvider>
        <SearchBar>
          <SearchTextFilter />
          <SearchSortWrap>
            <SelectFilter
              deafultText="Todos os status"
              filterKey="status"
              options={statusList}
            />
            <SelectFilter
              filterKey="client"
              deafultText="Todos os clientes"
              options={clients}
            />
            <SearchSortPeriod />
          </SearchSortWrap>
        </SearchBar>
        <ScrollArea className="grow px-0">
          <PageContent className="max-w-dvw px-0 lg:px-0">
            <OrderTable />
            <LoadingBox className="mx-4 lg:mx-6" />
            <EmptyDataBox className="mx-4 lg:mx-6" />
            <ErrorDataBox className="mx-4 lg:mx-6" />
          </PageContent>
        </ScrollArea>
        <SearchPagination />
      </SearchProvider>
    </PageMain>
  );
}
