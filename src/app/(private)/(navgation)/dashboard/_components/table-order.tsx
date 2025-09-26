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
import { OrderTableActions } from "../../orders/_components/order-table-actions";
import { statusMap } from "../../orders/_constants/status-map";

export const TableOrder = ({ orders }: { orders: Order[] }) => {
  return (
    <Table>
      <TableHeader className="border-t-0 border-none">
        <TableRow>
          <TableHead>Nome do orçamento</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order: Order) => (
          <TableRow key={order.code}>
            <TableCell className="text-title-light w-full font-semibold whitespace-nowrap">
              <span className="line-clamp-1 truncate" title={order.name}>
                {order.name}
              </span>
            </TableCell>
            <TableCell className="max-w-[9rem]">
              <Badge
                variant="secondary"
                className="max-w-full"
                title={` ${order.client.name} | ${order.client.code}`}
              >
                <span className="line-clamp-1 truncate">
                  {order.client.name} | {order.client.code}
                </span>
              </Badge>
            </TableCell>
            <TableCell className="max-w-[6.5rem]">
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
