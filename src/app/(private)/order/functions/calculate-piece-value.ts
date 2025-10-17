interface PieceCalculationResult {
  quantityInt: number;
  quantityFrac: number;
  unit: string;
  value: number;
}

export function calculatePieceMaterial(piece: Piece): PieceCalculationResult {
  let unitFraction = piece.measure.reduce(
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
