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

  const rawMaterials = order.projects.flatMap((project) => {
    const projectQtde = project.qtde ?? 1;

    return (
      project.pieces?.map((piece) => {
        const pieceCopy = { ...piece, qtde: piece.qtde * projectQtde };
        const calc = calculatePieceMaterial(pieceCopy);

        const material = piece.material;

        return {
          id: material.id,
          code: material.code ?? "N/A",
          name: material.name,
          baseValue: material.baseValue,
          unit: calc.unit,
          measure: material.measure,
          measureType: material.measureType,
          cutDirection: material.cutDirection,
          quantityInt: calc.quantityInt,
          quantityFrac: Number(calc.quantityFrac.toFixed(4)),
          value: calc.value,
        };
      }) ?? []
    );
  });

  const grouped = new Map<string, (typeof rawMaterials)[0]>();

  for (const mat of rawMaterials) {
    const key = [
      mat.id,
      mat.unit,
      mat.baseValue,
      mat.measure,
      mat.measureType,
      mat.cutDirection,
    ].join("|");

    if (!grouped.has(key)) {
      grouped.set(key, { ...mat });
    } else {
      const current = grouped.get(key)!;
      current.quantityInt += mat.quantityInt;
      current.quantityFrac = Number(
        (current.quantityFrac + mat.quantityFrac).toFixed(4),
      );
      current.value += mat.value;
    }
  }

  const usedMaterials = Array.from(grouped.values()).map((mat) => ({
    id: mat.id,
    code: mat.code,
    name: `${mat.name} (${currency(mat.baseValue)}/${mat.unit})`,
    intQtde: mat.quantityInt,
    qtde: Number(mat.quantityFrac.toFixed(4)),
    measure: mat.unit,
    unitPrice: currency(mat.baseValue),
    total: currency(mat.value),
    measureBase: mat.measure,
    measureType: mat.measureType,
    cutDirection: mat.cutDirection,
  }));

  const materialsTotal = currency(
    usedMaterials.reduce((acc, mat) => {
      const val = parseFloat(
        mat.total.replace(/[^\d,-]/g, "").replace(",", "."),
      );
      return acc + (Number.isNaN(val) ? 0 : val);
    }, 0),
  );

  const otherCosts = order.projects.flatMap((project) => {
    return (
      project.costs?.map((cost) => ({
        name: `${project.name} - ${cost.name}`,
        qtde: cost.qtde,
        value: currency(cost.value),
        total: currency(cost.value * cost.qtde),
      })) ?? []
    );
  });

  const otherCostsTotal = currency(
    otherCosts.reduce((acc, cost) => {
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
