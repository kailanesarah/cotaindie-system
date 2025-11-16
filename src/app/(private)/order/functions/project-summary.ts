import { calculatePieceMaterial } from "../functions/calculate-piece-value";
import { calculateProjectValue } from "../functions/calculate-project-value";

export type ProjectSummary = {
  index: number;
  name: string;
  qtde: number;
  baseCost: number;
  costWithExpenses: number;
  profit: number;
  profitPerProject: number;
  priceWithProfit: number;
  commission: number;
  projectValue: number;
  totalValue: number;
  project: Project;
};

export const getProjectSummary = (
  project: Project,
  index: number,
): ProjectSummary => {
  const rawAmount =
    project.pieces?.reduce(
      (acc, piece) => acc + calculatePieceMaterial(piece).value,
      0,
    ) ?? 0;

  const totalCosts =
    project.costs?.reduce((acc, cost) => acc + cost.qtde * cost.value, 0) ?? 0;

  const {
    baseCost,
    costWithExpenses,
    profit,
    priceWithProfit,
    commission,
    finalValue: projectValue,
  } = calculateProjectValue(
    rawAmount,
    totalCosts,
    project.profitRate,
    project.monthlyExpense,
    project.comission,
  );

  const totalValue = projectValue * project.qtde;

  return {
    index: index + 1,
    name: project.name,
    qtde: project.qtde,
    baseCost,
    profit: profit * project.qtde,
    costWithExpenses,
    profitPerProject: profit,
    priceWithProfit,
    commission,
    projectValue,
    totalValue,
    project,
  };
};
