interface Piece {
  id?: string;
  name?: string;
  qtde: number;
  measure: [number] | [number, number];
  material: Pick<
    Material,
    | "id"
    | "name"
    | "code"
    | "measure"
    | "measureType"
    | "baseValue"
    | "unit"
    | "wasteTax"
    | "cutDirection"
  >;
}
