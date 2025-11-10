import { hasItemsActions } from "../../_actions/has-items-action";
import { PageContent } from "../_components/page-content";
import {
  PageHeader,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderIcon,
  PageHeaderTitle,
} from "../_components/page-header";
import { PageMain } from "../_components/page-main";
import { DialogProvider } from "../_context/dialog-provider";
import { AddClientCard } from "../clients/_components/add-client-card";
import { AddMaterialsCard } from "../materials/_components/add-materials-card";
import { AddOrderCard } from "../orders/_components/add-order-card";
import { GraphsGroup } from "./_components/graphs-group";
import { TablesGroup } from "./_components/tables-group";

export default async function DashboardPage() {
  const { has_materials, has_clients, has_orders } = await hasItemsActions();

  return (
    <DialogProvider>
      <PageMain>
        <PageHeader>
          <PageHeaderContent>
            <PageHeaderIcon name="dashboard_customize" />
            <PageHeaderHeading>
              <PageHeaderTitle>Dashboard - Resumo geral</PageHeaderTitle>
              <PageHeaderDescription>
                Veja os principais números e lançamentos de pedidos.
              </PageHeaderDescription>
            </PageHeaderHeading>
          </PageHeaderContent>
        </PageHeader>
        <PageContent className="flex flex-col gap-2 pb-0 lg:gap-4 lg:p-6">
          {!has_materials && <AddMaterialsCard />}
          {!has_clients && <AddClientCard />}
          {!has_orders && has_clients && has_materials && <AddOrderCard />}
          {has_clients && has_materials && has_orders && (
            <>
              <GraphsGroup />
              <TablesGroup />
            </>
          )}
        </PageContent>
      </PageMain>
    </DialogProvider>
  );
}
