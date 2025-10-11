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
import { categories } from "../_constants/categories";
import { SearchProvider } from "../_context/search-provider";
import { MaterialDialog } from "./_components/material-dialog";
import { ResultGrid } from "./_components/material-grid";

export default async function MaterialsPage() {
  return (
    <PageMain>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderIcon name="inventory_2" />
          <PageHeaderHeading>
            <PageHeaderTitle>
              Materiais disponíveis para clientes
            </PageHeaderTitle>
            <PageHeaderDescription>
              Gerencie os itens disponíveis, seus valores e tamanhos, que
              servirão como base para os orçamentos.
            </PageHeaderDescription>
          </PageHeaderHeading>
        </PageHeaderContent>
        <PageHeaderAction>
          <AddButton text="Novo material">
            <MaterialDialog />
          </AddButton>
        </PageHeaderAction>
      </PageHeader>
      <SearchProvider>
        <SearchBar>
          <SearchTextFilter />
          <SearchSortWrap>
            <SelectFilter options={categories} />
            <SearchSortPeriod />
          </SearchSortWrap>
        </SearchBar>
        <PageContent>
          <ResultGrid />
          <LoadingBox />
          <EmptyDataBox />
          <ErrorDataBox />
        </PageContent>
        <SearchPagination />
      </SearchProvider>
    </PageMain>
  );
}
