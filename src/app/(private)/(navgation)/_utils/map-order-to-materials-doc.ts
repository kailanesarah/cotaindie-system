import type { MaterialsDocumentProps } from "@/pdfs/_docs/materials-document";
import { currencyFormatter } from "../../order/_utils/currency-formatter";
import { calculatePieceMaterial } from "../../order/functions/calculate-piece-value";
import { formatDate } from "./format-date";

export const mapOrderToMaterialsDoc = (
  order: Partial<Order>,
): MaterialsDocumentProps | null => {
  if (!order.client || !order.projects) return null;

  const currency = (v: number) => currencyFormatter.format(v);

  const reportProjects = order.projects.map((p: Project) => ({
    name: p.name,
    qtde: p.qtde ?? 1,
  }));

  const usedMaterials = order.projects.flatMap((project) => {
    const projectQtde = project.qtde ?? 1;

    return (
      project.pieces?.map((piece) => {
        const pieceCopy = { ...piece, qtde: piece.qtde * projectQtde };
        const calc = calculatePieceMaterial(pieceCopy);

        return {
          code: piece.material.code ?? "N/A",
          name: piece.material.name ?? "Material sem nome",
          intQtde: calc.quantityInt,
          qtde: calc.quantityFrac,
          measure: calc.unit,
          unitPrice: currency(piece.material.baseValue),
          total: currency(calc.value),
        };
      }) ?? []
    );
  });

  const materialsTotal = currency(
    usedMaterials.reduce((acc: number, mat: { total: string }) => {
      const val = parseFloat(
        mat.total.replace(/[^\d,-]/g, "").replace(",", "."),
      );
      return acc + (Number.isNaN(val) ? 0 : val);
    }, 0),
  );

  const otherCosts = order.projects.flatMap((project) => {
    return (
      project.costs?.map((cost) => ({
        name: cost.name,
        qtde: cost.qtde,
        value: currency(cost.value),
        total: currency(cost.value * cost.qtde),
      })) ?? []
    );
  });
  console.log(otherCosts);
  const otherCostsTotal = currency(
    otherCosts.reduce((acc: number, cost: { total: string }) => {
      const val = parseFloat(
        cost.total.replace(/[^\d,-]/g, "").replace(",", "."),
      );
      return acc + (Number.isNaN(val) ? 0 : val);
    }, 0),
  );

  const report = {
    quoteCode: order.code ?? "N/A",
    reportCode: `${order.code ?? ""}`,
    title: "Relatório de materiais e custos",
    generationDate: formatDate(order.initialDate),
    projects: reportProjects,
    usedMaterials,
    materialsTotal,
    otherCosts,
    otherCostsTotal,
    notes: order.notes ?? "",
  };

  return {
    client: {
      name: order.client.name,
      code: order.client.code,
    },
    report,
  };
};
