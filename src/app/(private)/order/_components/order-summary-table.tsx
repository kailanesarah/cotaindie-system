"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { projectsSummaryList } from "../_constants/projects-summary-list";
import { OrderSummaryActions } from "./order-summary-actions";

export const OrderSummaryTable = () => {
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
        {projectsSummaryList.map((project: Project, index) => (
          <TableRow
            key={index}
            className="text-title-light whitespace-nowrap last:border-0"
          >
            <TableCell className="pr-0">{index}</TableCell>
            <TableCell>
              <span className="line-clamp-1" title={project.name}>
                {project.name}
              </span>
            </TableCell>
            <TableCell>{project.qtde}</TableCell>
            <TableCell>R$ 4.639,00</TableCell>
            <TableCell>R$ 4.639,00</TableCell>
            <TableCell className="flex h-full items-center justify-center text-right">
              <OrderSummaryActions project={project} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
