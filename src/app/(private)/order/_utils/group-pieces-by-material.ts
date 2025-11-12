export interface GroupedPieces {
  material: Partial<Material>;
  pieces: Piece[];
  totalQtde: number;
}

interface GroupedPiecesResult {
  groups: GroupedPieces[];
  uniqueMaterialsCount: number;
}

export function groupPiecesByMaterial(pieces: Piece[]): GroupedPiecesResult {
  const grouped = pieces.reduce<Record<string, GroupedPieces>>((acc, piece) => {
    const { id, baseValue } = piece.material;
    const { measure, measureType, cutDirection } = piece.material;

    const key = `${id}|${measure}|${measureType}|${cutDirection}|${baseValue}`;

    if (!acc[key]) {
      acc[key] = {
        material: piece.material,
        pieces: [],
        totalQtde: 0,
      };
    }

    acc[key].pieces.push(piece);
    acc[key].totalQtde += piece.qtde;

    return acc;
  }, {});

  const groups = Object.values(grouped);

  return {
    groups,
    uniqueMaterialsCount: groups.length,
  };
}
