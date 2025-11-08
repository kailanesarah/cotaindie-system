"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

export const MetricCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-default border-red-default grow overflow-clip border-b-[0.125rem] bg-white lg:border-b-0 lg:border-l-[0.1875rem]">
      <div className="border-b-light rounded-tl-default rounded-tr-default lg:rounded-tr-default lg:rounded-br-default flex h-full items-start justify-between gap-6 border px-4 py-4 lg:border-l-0 lg:px-6">
        {children}
      </div>
    </div>
  );
};

export const MetricWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      {children}
    </div>
  );
};

export const MetricWrap = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col">{children}</div>;
};

export const MetricPieChart = ({
  values,
}: {
  values: { approved: number; open: number };
}) => {
  const data = [
    {
      status: "Finalizadas",
      value: values.approved,
      fill: "var(--color-red-default)",
    },
    {
      status: "Orçadas",
      value: values.open,
      fill: "var(--color-b-light)",
    },
  ];

  return (
    <ChartContainer
      config={{
        value: { label: "Vendas" },
      }}
      className="aspect-square w-full max-w-[3.875rem]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <ChartTooltip
            cursor={false}
            offset={20}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="status"
            innerRadius="70%"
            outerRadius="100%"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export const MetricIcon = ({ name }: { name: string }) => {
  return <Icon name={name} size={20} className="text-red-default" />;
};

export const MetricLabel = ({ children }: { children: ReactNode }) => {
  return <span className="text-title-light font-semibold">{children}</span>;
};

export const MetricTitle = ({ children }: { children: ReactNode }) => {
  return <h4 className="!text-red-default mt-2 mb-3">{children}</h4>;
};

export const MetricPoint = ({
  className,
  text,
}: {
  className: string;
  text: string;
}) => {
  return (
    <span className="flex items-center gap-2">
      <div className={cn("size-1.5 rounded-[0.125rem]", className)} />
      {text}
    </span>
  );
};

export const MetricFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <span className={cn("text-body-lighter text-xs", className)}>
      {children}
    </span>
  );
};
