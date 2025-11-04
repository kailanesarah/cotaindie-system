import { CuttingPlan } from "@/lib/cutting-plan";

interface PieceCalculationResult {
  quantityInt: number;
  quantityFrac: number;
  unit: string;
  value: number;
}

export function calculatePieceMaterial(piece: Piece): PieceCalculationResult {
  if (piece.material.measureType === "M2") {
    const config = {
      sheetW: piece.material.measure[0],
      sheetH: piece.material.measure[1] ?? 0,
      margin: 0,
      pieceSpacing: 0,
      allowRotate: piece.material.cutDirection === "VH",
      wastePercentage: piece.material.wasteTax ?? 0,
      items: Array.from({ length: piece.qtde }, (_, i) => ({
        name: piece.name ?? `Peça ${i + 1}`,
        w: piece.measure[0] ?? 0,
        h: piece.measure[1] ?? 0,
      })),
    };

    const cuttingPlan = new CuttingPlan(config);
    const results = cuttingPlan.calculate({ includeImages: false });

    const quantityFrac = parseFloat(results.totalFractionalSheets.toFixed(4));
    const quantityInt = Math.ceil(results.totalFractionalSheets);
    const value = parseFloat(
      (quantityFrac * piece.material.baseValue).toFixed(2),
    );

    return {
      quantityInt,
      quantityFrac,
      unit: piece.material.measureType,
      value,
    };
  }

  const unitFraction = piece.measure.reduce(
    (acc, val, i) => acc * (val / (piece.material.measure[i] || 1)),
    1,
  );

  const totalUnit = unitFraction * piece.qtde;

  const quantityInt = Math.ceil(totalUnit);
  const quantityFrac = parseFloat(totalUnit.toFixed(2));
  const value = parseFloat((totalUnit * piece.material.baseValue).toFixed(2));

  return {
    quantityInt,
    quantityFrac,
    unit: piece.material.measureType,
    value,
  };
}
