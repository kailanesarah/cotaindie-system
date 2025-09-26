"use client";

import { Icon } from "@/components/ui/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";
import { currencyFormatter } from "../_utils/currency-formatter";
import { groupPiecesByMaterial } from "../_utils/group-pieces-by-material";
import { PiecesTableActions } from "./pieces-table-actions";

export const PiecesTable = ({ pieces }: { pieces: Piece[] }) => {
  const { groups: materialGroups, uniqueMaterialsCount } =
    groupPiecesByMaterial(pieces);

  const [openGroups, setOpenGroups] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(materialGroups.map((_, i) => [i, false])),
  );

  const toggleGroup = (idx: number) =>
    setOpenGroups((s) => ({ ...s, [idx]: !s[idx] }));

  return (
    <Table
      className="border-0"
      classNameWrap="rounded-default border-b-light border"
    >
      <TableHeader>
        <TableRow className="bg-body-dark">
          <TableHead className="max-w-[3rem]">N°</TableHead>
          <TableHead className="w-full">Material/ Peça</TableHead>
          <TableHead className="max-w-[10.75rem]">Qtde M. Int.</TableHead>
          <TableHead className="max-w-[10.75rem]">Qtde Mat.</TableHead>
          <TableHead className="max-w-[10.75rem]">Medida</TableHead>
          <TableHead className="max-w-[10.75rem]">Valor total</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-title-light">
        {materialGroups.map((group, gIndex) => {
          const groupKey = group.material?.id ?? gIndex;

          if (group.material.measureType === "un") {
            return group.pieces.map((piece, index) => (
              <TableRow
                key={`un-${gIndex}-${index}-${piece.id ?? "noid"}`}
                className="text-title-light whitespace-nowrap last:border-0"
              >
                <TableCell className="pr-0">{gIndex + 1}</TableCell>
                <TableCell>
                  <span className="line-clamp-1" title={piece.name}>
                    {piece.material.name}
                  </span>
                </TableCell>
                <TableCell>{piece.qtde}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{piece.material.measureType}</TableCell>
                <TableCell>
                  {currencyFormatter.format(
                    piece.qtde * piece.material.baseValue,
                  )}
                </TableCell>
                <TableCell className="flex h-full items-center justify-center text-right">
                  <PiecesTableActions piece={piece} index={gIndex + 1} />
                </TableCell>
              </TableRow>
            ));
          }
          return (
            <Fragment key={`group-${gIndex}-${groupKey}`}>
              <TableRow className="text-title-light whitespace-nowrap last:border-0">
                <TableCell className="pr-0">{gIndex + 1}</TableCell>
                <TableCell>
                  <span className="line-clamp-1" title={group.material.name}>
                    {group.material.name}
                  </span>
                </TableCell>
                <TableCell>{group.totalQtde}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell className="flex h-full items-center justify-center text-right">
                  <div
                    className="group"
                    data-open={!!openGroups[gIndex]}
                    aria-expanded={!!openGroups[gIndex]}
                  >
                    <button
                      onClick={() => toggleGroup(gIndex)}
                      className="-my-1 flex cursor-pointer items-center justify-center p-1"
                    >
                      <Icon
                        name="keyboard_arrow_down"
                        className="transition-transform group-data-[open=true]:rotate-180"
                      />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
              {openGroups[gIndex] &&
                group.pieces.map((piece: Piece, i: number) => (
                  <TableRow
                    key={`piece-${gIndex}-${i}-${piece.id ?? "noid"}`}
                    className={cn(
                      "bg-body-dark/50",
                      i === group.pieces.length - 1 &&
                        "border-black-default border-b",
                    )}
                  >
                    <TableCell>
                      {gIndex + 1}.{i + 1}
                    </TableCell>
                    <TableCell>{piece.name}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell className="flex items-center justify-center text-right">
                      <PiecesTableActions piece={piece} index={i + 1} />
                    </TableCell>
                  </TableRow>
                ))}
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
};
