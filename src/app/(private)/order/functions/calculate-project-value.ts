export const calculateProjectValue = (
  piecesAmount: number,
  totalCosts: number,
  profitRate: number,
  monthlyExpense: number,
  comission: number,
  qtde: number,
) => {
  const expensePerProject = (piecesAmount * monthlyExpense) / qtde;

  const baseCost = piecesAmount + expensePerProject + totalCosts;

  const finalValue = ((baseCost * (1 + profitRate)) / (1 - comission)) * qtde;

  const profit = finalValue * (1 - comission) - baseCost;

  const effectiveProfitRate = profit / baseCost;

  return {
    baseCost,
    finalValue,
    profit,
    effectiveProfitRate,
  };
};
