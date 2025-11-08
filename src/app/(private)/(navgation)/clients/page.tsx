import { ScrollArea } from "@/components/temp/scroll-area";
import { AddButton } from "../_components/add-button";
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
import { ClientDialog } from "./_components/client-dialog";
import { ClientsTable } from "./_components/client-table";
import { clientsCategories } from "./_constants/clients-categories";

export default async function ClientsPage() {
  return (
    <DialogProvider>
      <PageMain>
        <PageHeader>
          <PageHeaderContent>
            <PageHeaderIcon name="article_person" />
            <PageHeaderHeading>
              <PageHeaderTitle>Clientes cadastrados</PageHeaderTitle>
              <PageHeaderDescription>
                Gerencie a lista de clientes para orçamento.
              </PageHeaderDescription>
            </PageHeaderHeading>
          </PageHeaderContent>
          <PageHeaderAction>
            <AddButton text="Novo cliente" dialogKey="clients:add">
              <ClientDialog />
            </AddButton>
          </PageHeaderAction>
        </PageHeader>
        <SearchProvider>
          <SearchBar>
            <SearchTextFilter />
            <SearchSortWrap>
              <SelectFilter options={clientsCategories} filterKey="type" />
              <SearchSortPeriod />
            </SearchSortWrap>
          </SearchBar>
          <ScrollArea className="flex grow items-stretch px-0">
            <PageContent className="flex max-w-dvw grow flex-col px-0 !py-0 lg:px-0">
              <ClientsTable />
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
