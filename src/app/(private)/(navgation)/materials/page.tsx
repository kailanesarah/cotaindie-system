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
} from "../_components/search-bar";
import { DialogProvider } from "../_context/dialog-provider";
import { SearchProvider } from "../_context/search-provider";
import { AddMaterialsCard } from "./_components/add-materials-card";
import { MaterialDialog } from "./_components/material-dialog";
import { MaterialsSearchContent } from "./_components/materials-search-content";
import { SelectCategories } from "./_components/select-categories";

export default async function MaterialsPage() {
  const { has_materials } = await hasItemsActions();

  return (
    <DialogProvider>
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
          {has_materials && (
            <PageHeaderAction>
              <AddButton text="Novo material" dialogKey="materials:add">
                <MaterialDialog />
              </AddButton>
            </PageHeaderAction>
          )}
        </PageHeader>
        <SearchProvider>
          {has_materials && (
            <SearchBar>
              <SearchTextFilter />
              <SearchSortWrap>
                <SelectCategories />
                <SearchSortPeriod />
              </SearchSortWrap>
            </SearchBar>
          )}
          <PageContent>
            {has_materials && <MaterialsSearchContent />}
            {!has_materials && <AddMaterialsCard />}
          </PageContent>
          <SearchPagination />
        </SearchProvider>
      </PageMain>
    </DialogProvider>
  );
}
