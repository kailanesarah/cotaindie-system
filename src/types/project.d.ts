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

  profitRate: number;
  monthlyExpense: number;
  comission: number;
};
