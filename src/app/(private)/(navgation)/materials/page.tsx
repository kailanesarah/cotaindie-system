import { AddMaterialButton } from "../_components/add-button";
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
  SearchProvider,
  SearchSortPeriod,
  SearchSortWrap,
  SearchTextFilter,
  SelectFilter,
} from "../_components/search-bar";
import { categories } from "../_constants/categories";
import { MaterialDialog } from "./_components/material-dialog";
import { ResultGrid } from "./_components/material-grid";
import { materials } from "./_constants/material-list";

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
          <AddMaterialButton text="Novo material">
            <MaterialDialog />
          </AddMaterialButton>
        </PageHeaderAction>
      </PageHeader>
      <SearchProvider data={materials}>
        <SearchBar>
          <SearchTextFilter name="search" />
          <SearchSortWrap>
            <SelectFilter name="Categoria" options={categories} />
            <SearchSortPeriod />
          </SearchSortWrap>
        </SearchBar>
        <PageContent>
          <ResultGrid />
          <EmptyDataBox />
        </PageContent>
        <SearchPagination />
      </SearchProvider>
    </PageMain>
  );
}
