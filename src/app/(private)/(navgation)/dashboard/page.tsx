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
      <PageContent className="grid grid-cols-3 items-start gap-4">
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
                <MetricPoint className="bg-b-light" text="Orçados - 33" />
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
            <MetricLabel>Lucro estimado</MetricLabel>
            <MetricTitle>R$ 23.842,43</MetricTitle>
            <MetricFooter>Lucro estimado - últimos 30 dias</MetricFooter>
          </MetricWrap>
          <MetricIcon name="trending_up" />
        </MetricCard>
      </PageContent>
    </PageMain>
  );
}
