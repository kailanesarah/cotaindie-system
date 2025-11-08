import { ScrollArea } from "@/components/temp/scroll-area";
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
import { DialogProvider } from "../_context/dialog-provider";
import { SearchProvider } from "../_context/search-provider";
import { AddOrderButton } from "./_components/add-order-button";
import { OrderTable } from "./_components/order-table";
import { SelectClients } from "./_components/select-clients";
import { statusList } from "./_constants/status-list";

export default async function OrdersPage() {
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
              <SelectClients />
              <SearchSortPeriod />
            </SearchSortWrap>
          </SearchBar>
          <ScrollArea className="flex grow items-stretch px-0">
            <PageContent className="flex max-w-dvw grow flex-col px-0 !py-0 lg:px-0">
              <OrderTable />
              <EmptyDataBox className="mx-4 my-3 lg:mx-6 lg:my-4" />
              <ErrorDataBox className="mx-4 my-3 lg:mx-6 lg:my-4" />
            </PageContent>
          </ScrollArea>
          <LoadingBox className="mx-4 my-3 lg:mx-6 lg:my-4" />
          <SearchPagination />
        </SearchProvider>
      </PageMain>
    </DialogProvider>
  );
}
