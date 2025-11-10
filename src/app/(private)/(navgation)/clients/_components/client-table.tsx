"use client";

import type { SearchResult } from "@/app/(private)/_types/search-result";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { clientTypeMap } from "../_utils/client-type-map";
import { ClientTableActions } from "./client-table-actions";

export const ClientsTable = ({
  data,
}: {
  data: SearchResult<Client> | undefined;
}) => {
  if (!data?.items || data?.items.length === 0) return;

  return (
    <Table className="my-3 lg:my-4">
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead className="min-w-[12.5rem] lg:max-w-[14.75rem]">
            Nome ou razão social
          </TableHead>
          <TableHead className="hidden min-w-[12.5rem] lg:block">
            Observações
          </TableHead>
          <TableHead className="lg:min-w-[11.25rem]">Tipo de cliente</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.items.map((client) => (
          <TableRow key={client.code}>
            <TableCell>
              <Badge className="text-xs">C - {client.code}</Badge>
            </TableCell>
            <TableCell className="text-title-light font-semibold whitespace-nowrap">
              <span className="line-clamp-1" title={client.name}>
                {client.name}
              </span>
            </TableCell>
            <TableCell className="hidden lg:block">
              <span className="line-clamp-1" title={client.notes}>
                {client.notes}
              </span>
            </TableCell>
            <TableCell>
              <Badge variant="secondary">{clientTypeMap[client.type]}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <ClientTableActions client={client} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
