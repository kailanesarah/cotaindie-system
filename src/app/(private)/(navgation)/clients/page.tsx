import { ScrollArea } from "@/components/ui/scroll-area";
import { AddButton } from "../_components/add-button";
import { EmptyDataBox } from "../_components/empty-data-box";
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
import { ClientDialog } from "./_components/client-dialog";
import { ClientsTable } from "./_components/client-table";
import { clientsCategories } from "./_constants/clients-categories";

export default async function ClientsPage() {
  return (
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
          <AddButton text="Novo cliente">
            <ClientDialog />
          </AddButton>
        </PageHeaderAction>
      </PageHeader>
      <SearchProvider>
        <SearchBar>
          <SearchTextFilter />
          <SearchSortWrap>
            <SelectFilter options={clientsCategories} />
            <SearchSortPeriod />
          </SearchSortWrap>
        </SearchBar>
        <ScrollArea className="grow px-0">
          <PageContent className="max-w-dvw px-0 lg:px-0">
            <ClientsTable />
            <EmptyDataBox className="mx-4 lg:mx-6" />
          </PageContent>
        </ScrollArea>
        <SearchPagination />
      </SearchProvider>
    </PageMain>
  );
}
