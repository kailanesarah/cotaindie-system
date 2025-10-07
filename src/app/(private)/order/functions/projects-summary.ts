import { calculatePieceMaterial } from "../functions/calculate-piece-value";
import { calculateProjectValue } from "../functions/calculate-project-value";

export type ProjectSummary = {
  index: number;
  name: string;
  qtde: number;
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
    project.costs?.reduce(
      (acc, cost) => acc + (cost.qtde || 0) * (cost.value || 0),
      0,
    ) ?? 0;

  const { finalValue: projectValue } = calculateProjectValue(
    rawAmount,
    totalCosts,
    project.monthlyExpense,
    project.profitRate,
    project.comission,
    1,
  );

  const totalValue = projectValue * (project.qtde || 1);

  return {
    index: index + 1,
    name: project.name,
    qtde: project.qtde,
    projectValue,
    totalValue,
    project,
  };
};
