type Cost = {
  name: string;
  qtde: number;
  value: number;
};

type Project = {
  name: string;
  qtde: number;

  pieces: Piece[];

  costs: Cost[];

  rawTotal: number;

  profitRate: number;
  monthlyExpense: number;
  comission: number;
};
