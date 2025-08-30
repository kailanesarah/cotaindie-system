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
import { useFilterContext } from "../../_context/seach-provider";
import { ClientTableActions } from "./client-table-actions";

export const ClientsTable = () => {
  const { data: clients } = useFilterContext<Client>();

  if (clients.length === 0 || !clients) return;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead className="max-w-[14.75rem] min-w-[12.5rem]">
            Nome ou razão social
          </TableHead>
          <TableHead className="min-w-[12.5rem]">Observações</TableHead>
          <TableHead className="min-w-[11.25rem]">Tipo de cliente</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.code}>
            <TableCell>
              <Badge className="text-xs">{client.code}</Badge>
            </TableCell>
            <TableCell className="text-title-light font-semibold whitespace-nowrap">
              <span className="line-clamp-1" title={client.name}>
                {client.name}
              </span>
            </TableCell>
            <TableCell>
              <span className="line-clamp-1" title={client.note}>
                {client.note}
              </span>
            </TableCell>
            <TableCell>
              <Badge variant="secondary">{client.type}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <ClientTableActions />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
