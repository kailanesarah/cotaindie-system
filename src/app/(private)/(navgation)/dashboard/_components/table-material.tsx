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

export type TMaterialData = {
  material: Pick<Material, "code" | "measure" | "measureType" | "name">;
  measureBase: number;
  spent: number;
};

export const TableMaterial = ({ data }: { data: TMaterialData[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Nome do material</TableHead>
          <TableHead>Medida Base</TableHead>
          <TableHead>Utilizados</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((value: TMaterialData, index) => {
          return (
            <TableRow key={index}>
              <TableCell className="max-w-[9rem]">
                <Badge className="max-w-full" title={`${value.material.code}`}>
                  <span className="line-clamp-1 truncate">
                    M - {value.material.code}
                  </span>
                </Badge>
              </TableCell>
              <TableCell className="text-title-light w-full max-w-[11.75rem] font-semibold whitespace-nowrap">
                <span
                  className="line-clamp-1 truncate"
                  title={value.material.name}
                >
                  {value.material.name}
                </span>
              </TableCell>
              <TableCell className="text-title-light w-full max-w-[7rem] whitespace-nowrap">
                <span className="line-clamp-1 truncate">
                  {value.measureBase.toFixed(2)} {value.material.measureType}
                </span>
              </TableCell>
              <TableCell className="text-title-light max-w-[8rem] whitespace-nowrap">
                {value.spent.toFixed(2)} {value.material.measureType}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
