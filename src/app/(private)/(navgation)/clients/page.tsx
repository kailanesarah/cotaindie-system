import { ScrollArea } from "@/components/ui/scroll-area";
import { hasItemsActions } from "../../_actions/has-items-action";
import { AddButton } from "../_components/add-button";
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
import { AddClientCard } from "./_components/add-client-card";
import { ClientDialog } from "./_components/client-dialog";
import { ClientSearchContent } from "./_components/client-search-content";
import { clientsCategories } from "./_constants/clients-categories";

export default async function ClientsPage() {
  const { has_clients } = await hasItemsActions();

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
          {has_clients && (
            <PageHeaderAction>
              <AddButton text="Novo cliente" dialogKey="clients:add">
                <ClientDialog />
              </AddButton>
            </PageHeaderAction>
          )}
        </PageHeader>
        <SearchProvider>
          {has_clients && (
            <SearchBar>
              <SearchTextFilter />
              <SearchSortWrap>
                <SelectFilter options={clientsCategories} filterKey="type" />
                <SearchSortPeriod />
              </SearchSortWrap>
            </SearchBar>
          )}
          <ScrollArea className="flex grow items-stretch px-0">
            <PageContent className="flex max-w-dvw grow flex-col px-0 !py-0 lg:px-0">
              {has_clients && <ClientSearchContent />}
              {!has_clients && <AddClientCard />}
            </PageContent>
          </ScrollArea>
          <SearchPagination />
        </SearchProvider>
      </PageMain>
    </DialogProvider>
  );
}
