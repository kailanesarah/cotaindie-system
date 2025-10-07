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
    const materialId = piece.material.name;

    if (!acc[materialId]) {
      acc[materialId] = {
        material: piece.material,
        pieces: [],
        totalQtde: 0,
      };
    }

    acc[materialId].pieces.push(piece);
    acc[materialId].totalQtde += piece.qtde;

    return acc;
  }, {});

  const groups = Object.values(grouped);

  return {
    groups,
    uniqueMaterialsCount: groups.length,
  };
}
