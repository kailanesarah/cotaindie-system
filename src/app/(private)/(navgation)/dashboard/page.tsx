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
import { GraphsGroup } from "./_components/graphs-group";
import { TablesGroup } from "./_components/tables-group";

export default async function DashboardPage() {
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
        <PageContent className="flex flex-col gap-2 pb-0 lg:gap-4 lg:pb-6">
          <GraphsGroup />
          <TablesGroup />
        </PageContent>
      </PageMain>
    </DialogProvider>
  );
}
