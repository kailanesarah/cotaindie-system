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
import { useOrdersSearch } from "../_hooks/use-search-orders";
import { OrderTableActions } from "./order-table-actions";

export const OrderTable = () => {
  const { data } = useOrdersSearch();

  if (!data?.items || data?.items.length === 0) return;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead className="w-full">Nome do orçamento</TableHead>
          <TableHead className="max-w-[17.5rem]">Cliente</TableHead>
          <TableHead className="max-w-[10.75rem]">
            <span className="hidden lg:block">Fase do pedido</span>
            <span className="lg:hidden">Status</span>
          </TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.items.map((order) => (
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
                <div>
                  {order.client.name}{" "}
                  <span className="hidden lg:inline">
                    | {order.client.code}
                  </span>
                </div>
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
