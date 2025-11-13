"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Fragment, useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { DeleteDialog } from "../../(navgation)/_components/delete-dialog";
import { formatMeasure } from "../../(navgation)/materials/_utils/format-mesure";
import { currencyFormatter } from "../_utils/currency-formatter";
import {
  groupPiecesByMaterial,
  type GroupedPieces,
} from "../_utils/group-pieces-by-material";
import { calculatePieceMaterial } from "../functions/calculate-piece-value";

export const PiecesTableActions = ({ index }: { index: number }) => {
  const { control } = useFormContext();
  const { remove } = useFieldArray({ control, name: "pieces" });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = () => {
    remove(index);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button square variant="link" className="-my-0.5 size-6">
            <Icon name="more_vert" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={12} align="end" alignOffset={16}>
          <DropdownMenuItem
            className="text-red-default"
            onClick={() => setIsDeleteOpen(true)}
          >
            <Icon name="delete" /> Apagar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DeleteDialog handleDelete={handleDelete} />
      </Dialog>
    </>
  );
};

const PiecesTableRowSingle = ({
  pieces,
  gIndex,
}: {
  pieces: Piece[];
  gIndex: number;
}) => {
  const { getValues } = useFormContext<{ pieces: Piece[] }>();
  const allPieces = getValues("pieces");

  return (
    <>
      {pieces.map((piece) => {
        const calc = calculatePieceMaterial(piece);
        const globalIndex = allPieces.indexOf(piece);
        return (
          <TableRow
            key={`un-${gIndex}-${globalIndex}`}
            className="text-title-light whitespace-nowrap last:border-0"
          >
            <TableCell className="pr-0">{gIndex + 1}</TableCell>
            <TableCell>
              <span
                className="line-clamp-1 whitespace-nowrap lg:line-clamp-none lg:whitespace-normal"
                title={`${piece.name} (Q${piece.qtde} - ${formatMeasure(piece.measure, piece.material.unit)} - ${currencyFormatter.format(piece.material.baseValue)})`}
              >
                {piece.material.name}{" "}
              </span>
            </TableCell>
            <TableCell>{calc.quantityInt}</TableCell>
            <TableCell>{calc.quantityFrac}</TableCell>
            <TableCell>{calc.unit}</TableCell>
            <TableCell>{currencyFormatter.format(calc.value)}</TableCell>
            <TableCell className="flex h-full items-center justify-center text-right">
              <PiecesTableActions index={globalIndex} />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
};

const PiecesTableRowGroup = ({
  group,
  gIndex,
  isOpen,
  toggleGroup,
}: {
  group: GroupedPieces;
  gIndex: number;
  isOpen: boolean;
  toggleGroup: (idx: number) => void;
}) => {
  const { getValues } = useFormContext<{ pieces: Piece[] }>();
  const allPieces = getValues("pieces");

  const groupCalc = group.pieces.reduce(
    (acc, piece) => {
      const calc = calculatePieceMaterial(piece);
      acc.quantityInt += calc.quantityInt;
      acc.quantityFrac += calc.quantityFrac;
      acc.value += calc.value;
      return acc;
    },
    { quantityInt: 0, quantityFrac: 0, value: 0 },
  );

  return (
    <Fragment>
      <TableRow className="text-title-light whitespace-nowrap last:border-0">
        <TableCell className="pr-0">{gIndex + 1}</TableCell>
        <TableCell>
          <span
            className="line-clamp-1 whitespace-nowrap lg:line-clamp-none lg:whitespace-normal"
            title={`${group.material.name} (${currencyFormatter.format(group.material.baseValue || 0)} - ${group.material && formatMeasure(group.material.measure || [0, 0], group.material.unit || "N/A")})`}
          >
            {group.material.name}
          </span>
        </TableCell>
        <TableCell>{groupCalc.quantityInt}</TableCell>
        <TableCell>{groupCalc.quantityFrac.toFixed(2)}</TableCell>
        <TableCell>{group.material.measureType}</TableCell>
        <TableCell>{currencyFormatter.format(groupCalc.value)}</TableCell>
        <TableCell className="flex h-full items-center justify-center text-right">
          <div className="group" data-open={isOpen} aria-expanded={isOpen}>
            <button
              type="button"
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
      {isOpen &&
        group.pieces.map((piece, i) => {
          const calc = calculatePieceMaterial(piece);
          const globalIndex = allPieces.indexOf(piece);

          return (
            <TableRow
              key={`piece-${gIndex}-${i}`}
              className={cn(
                "bg-body-dark/50",
                i === group.pieces.length - 1 &&
                  "border-black-default border-b",
              )}
            >
              <TableCell>
                {gIndex + 1}.{i + 1}
              </TableCell>
              <TableCell>
                <span
                  className="line-clamp-1 whitespace-nowrap lg:line-clamp-none lg:whitespace-normal"
                  title={`${piece.name} (Q${piece.qtde} - ${formatMeasure(piece.measure, piece.material.unit)})`}
                >
                  {piece.name}
                </span>
              </TableCell>
              <TableCell>{calc.quantityInt}</TableCell>
              <TableCell>{calc.quantityFrac.toFixed(2)}</TableCell>
              <TableCell>{calc.unit}</TableCell>
              <TableCell>{currencyFormatter.format(calc.value)}</TableCell>
              <TableCell className="flex items-center justify-center text-right">
                <PiecesTableActions index={globalIndex} />
              </TableCell>
            </TableRow>
          );
        })}
    </Fragment>
  );
};

interface PiecesTableProps {
  pieces: Piece[];
}

export const PiecesTable = ({ pieces }: PiecesTableProps) => {
  const { groups: materialGroups } = groupPiecesByMaterial(pieces);
  const [openGroups, setOpenGroups] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(materialGroups.map((_, i) => [i, true])),
  );

  const toggleGroup = (idx: number) =>
    setOpenGroups((s) => ({ ...s, [idx]: !s[idx] }));

  const { setValue } = useFormContext<{ pieces: Piece[]; rawAmount: number }>();

  useEffect(() => {
    const total = pieces.reduce((acc, piece) => {
      const { value } = calculatePieceMaterial(piece);
      return acc + value;
    }, 0);

    setValue("rawAmount", total);
  }, [pieces, setValue]);

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
        {materialGroups.map((group, gIndex) =>
          group.material.measureType === "UN" ? (
            <PiecesTableRowSingle
              key={gIndex}
              pieces={group.pieces}
              gIndex={gIndex}
            />
          ) : (
            <PiecesTableRowGroup
              key={gIndex}
              group={group}
              gIndex={gIndex}
              isOpen={!!openGroups[gIndex]}
              toggleGroup={toggleGroup}
            />
          ),
        )}
      </TableBody>
    </Table>
  );
};
