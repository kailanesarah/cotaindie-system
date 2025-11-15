"use client";

import { currencyFormatter } from "@/app/(private)/order/_utils/currency-formatter";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMetrics } from "../_hooks/use-get-metrics";
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
} from "./chart";
import { ChartAreaInteractive } from "./graph-card";

export const GraphsGroup = () => {
  const { data, loading } = useGetMetrics();
  const { orders, amount, profit, data: chart } = data ?? {};

  if (loading) {
    return (
      <>
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
          <Skeleton className="h-[7.375rem] grow" />
          <Skeleton className="h-[7.375rem] grow" />
          <Skeleton className="h-[7.375rem] grow" />
        </div>
        <Skeleton className="h-[27rem] w-full" />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-4">
        <MetricCard>
          <MetricWrapper>
            <MetricWrap>
              <MetricLabel>Pedidos finalizados</MetricLabel>
              <MetricTitle>
                {orders?.approved ?? 0}
                <span className="text-title-light ml-[0.375rem] text-sm">
                  Vendas
                </span>
              </MetricTitle>
              <MetricFooter className="flex gap-3">
                <MetricPoint
                  className="bg-black-default"
                  text={`Total - ${orders?.total ?? 0}`}
                />
                <MetricPoint
                  className="bg-b-light"
                  text={`Abertos - ${orders?.open ?? 0}`}
                />
              </MetricFooter>
            </MetricWrap>
            <MetricPieChart
              values={{
                approved: orders?.approved ?? 0,
                open: orders?.open ?? 0,
              }}
            />
          </MetricWrapper>
          <MetricIcon name="order_approve" />
        </MetricCard>
        <MetricCard>
          <MetricWrap>
            <MetricLabel>Receita de vendas</MetricLabel>
            <MetricTitle>{currencyFormatter.format(amount)}</MetricTitle>
            <MetricFooter>Pedidos fechados no mês atual</MetricFooter>
          </MetricWrap>
          <MetricIcon name="bar_chart_4_bars" />
        </MetricCard>
        <MetricCard>
          <MetricWrap>
            <MetricLabel>Lucro bruto estimado</MetricLabel>
            <MetricTitle>{currencyFormatter.format(profit)}</MetricTitle>
            <MetricFooter>Lucro estimado no mês atual</MetricFooter>
          </MetricWrap>
          <MetricIcon name="trending_up" />
        </MetricCard>
      </div>
      <ChartAreaInteractive data={chart ?? []} />
    </>
  );
};
