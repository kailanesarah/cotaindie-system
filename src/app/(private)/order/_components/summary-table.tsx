"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { useOrderStore } from "../_stores/order-store";
import { currencyFormatter } from "../_utils/currency-formatter";
import {
  getProjectSummary,
  type ProjectSummary,
} from "../functions/projects-summary";
import { OrderEmptyTable } from "./order-empty-table";
import { SummaryActions } from "./summary-actions";

export const SummaryTable = () => {
  const { order, setRawAmount } = useOrderStore();
  const projects = order.projects ?? [];

  const projectSummaries: ProjectSummary[] = projects.map(getProjectSummary);

  const projectsTotal = projectSummaries.reduce(
    (acc, project) => project.totalValue + acc,
    0,
  );

  useEffect(() => {
    setRawAmount(projectsTotal);
  }, [projectsTotal, setRawAmount]);

  if (!projects.length) {
    return (
      <OrderEmptyTable
        title="Adicione um novo projeto"
        text="Todos os projetos inseridos fazem parte deste orçamento ou pedido."
      />
    );
  }

  return (
    <Table
      className="border-0"
      classNameWrap="rounded-default border-b-light border"
    >
      <TableHeader>
        <TableRow className="bg-body-dark">
          <TableHead className="max-w-[3rem]">N°</TableHead>
          <TableHead className="w-full">Nome do projeto</TableHead>
          <TableHead className="max-w-[10.75rem]">Qtde</TableHead>
          <TableHead className="max-w-[10.75rem]">Valor do projeto</TableHead>
          <TableHead className="max-w-[10.75rem]">Valor total</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-title-light">
        {projectSummaries.map(
          ({ name, qtde, projectValue, totalValue, project }, index) => (
            <TableRow
              key={index}
              className="text-title-light whitespace-nowrap last:border-0"
            >
              <TableCell className="pr-0">{index}</TableCell>
              <TableCell>
                <span className="line-clamp-1" title={name}>
                  {name}
                </span>
              </TableCell>
              <TableCell>{qtde}</TableCell>
              <TableCell>{currencyFormatter.format(projectValue)}</TableCell>
              <TableCell>{currencyFormatter.format(totalValue)}</TableCell>
              <TableCell className="flex h-full items-center justify-center text-right">
                <SummaryActions project={project} index={index} />
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};
