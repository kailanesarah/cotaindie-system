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
import { orders } from "../orders/_constants/orders-list";
import {
  MetricCard,
  MetricFooter,
  MetricIcon,
  MetricLabel,
  MetricPieChart,
  MetricPoint,
  MetricTitle,
  MetricWrap,
  MetricWrapper,
} from "./_components/chart";
import { ChartAreaInteractive } from "./_components/graph-card";
import { TableMaterial } from "./_components/table-material";
import { TableOrder } from "./_components/table-order";
import { TableContent, TableTitle, TableWrap } from "./_components/table-wrap";
import { graphData } from "./_constant/graph-data";
import { materialsData } from "./_constant/spent-material-data";

export default async function DashboardPage() {
  return (
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
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
          <MetricCard>
            <MetricWrapper>
              <MetricWrap>
                <MetricLabel>Pedidos finalizados</MetricLabel>
                <MetricTitle>
                  42{" "}
                  <span className="text-title-light ml-[0.375rem] text-sm">
                    Vendas
                  </span>
                </MetricTitle>
                <MetricFooter className="flex gap-3">
                  <MetricPoint className="bg-black-default" text="Total - 67" />
                  <MetricPoint
                    className="bg-b-light"
                    text="Apenas orçados - 33"
                  />
                </MetricFooter>
              </MetricWrap>
              <MetricPieChart values={{ sold: 40, quoted: 21 }} />
            </MetricWrapper>
            <MetricIcon name="order_approve" />
          </MetricCard>
          <MetricCard>
            <MetricWrap>
              <MetricLabel>Receita de vendas</MetricLabel>
              <MetricTitle>R$ 86.842,43</MetricTitle>
              <MetricFooter>Pedidos fechados - últimos 30 dias</MetricFooter>
            </MetricWrap>
            <MetricIcon name="bar_chart_4_bars" />
          </MetricCard>
          <MetricCard>
            <MetricWrap>
              <MetricLabel>Lucro bruto estimado</MetricLabel>
              <MetricTitle>R$ 23.842,43</MetricTitle>
              <MetricFooter>Lucro estimado - últimos 30 dias</MetricFooter>
            </MetricWrap>
            <MetricIcon name="trending_up" />
          </MetricCard>
        </div>
        <ChartAreaInteractive data={graphData} />
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
  );
}
