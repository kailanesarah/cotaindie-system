export const calculateProjectValue = (
  piecesCost: number,
  otherCosts: number,
  profitRate: number,
  monthlyExpenseRate: number,
  commissionRate: number,
  quantity: number,
) => {
  const baseCost = (piecesCost + otherCosts) * quantity;

  const costWithExpenses = baseCost * (1 + monthlyExpenseRate);

  const priceWithProfit = costWithExpenses * (1 + profitRate);

  const finalValue = priceWithProfit * (1 + commissionRate);

  return {
    finalValue,
  };
};
