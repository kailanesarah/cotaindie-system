"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { statusMap } from "../../_constants/status-map";
import { useSearch } from "../../_hooks/use-search";
import { orders } from "../_constants/orders-list";
import { OrderTableActions } from "./order-table-actions";

export const OrderTable = () => {
  const { data } = useSearch<Order>({
    action: async (filters) => {
      console.log("Filtros recebidos:", filters);
      return {
        items: orders,
        totalPages: 1,
        page: 1,
      };
    },
  });

  if (data.length === 0 || !data) return;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead className="w-full">Nome do orçamento</TableHead>
          <TableHead className="max-w-[17.5rem]">Cliente</TableHead>
          <TableHead className="max-w-[10.75rem]">Fase do pedido</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((order) => (
          <TableRow key={order.code}>
            <TableCell>
              <Badge className="text-xs">{order.code}</Badge>
            </TableCell>
            <TableCell className="text-title-light font-semibold whitespace-nowrap">
              <span className="line-clamp-1" title={order.name}>
                {order.name}
              </span>
            </TableCell>
            <TableCell>
              <Badge variant="secondary">
                <span className="line-clamp-1">
                  {order.client.name} | {order.client.code}
                </span>
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={statusMap[order.status].type}>
                {statusMap[order.status].text}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <OrderTableActions order={order} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
