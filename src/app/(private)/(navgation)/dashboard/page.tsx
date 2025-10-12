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
import { orders } from "../orders/_constants/orders-list";
import { GraphsGroup } from "./_components/graphs-group";
import { TableMaterial } from "./_components/table-material";
import { TableOrder } from "./_components/table-order";
import { TableContent, TableTitle, TableWrap } from "./_components/table-wrap";
import { materialsData } from "./_constant/spent-material-data";

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
          <div className="mt-4 hidden grid-cols-1 gap-6 lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-4">
            <TableWrap>
              <TableTitle>Orçamentos recentes</TableTitle>
              <TableContent>
                <TableOrder orders={orders} />
              </TableContent>
            </TableWrap>
            <TableWrap>
              <TableTitle>
                Materiais mais utilizados nos últimos 30 dias
              </TableTitle>
              <TableContent>
                <TableMaterial data={materialsData} />
              </TableContent>
            </TableWrap>
          </div>
        </PageContent>
      </PageMain>
    </DialogProvider>
  );
}
