import { CuttingPlan } from "@/lib/cutting-plan";
import type {
  CuttingPlanDocumentProps,
  MaterialPlanProps,
  PiecePlanProps,
  ProjectPlanProps,
} from "@/pdfs/_docs/cutting-plan-document";
import { formatDate } from "./format-date";

export const mapOrderToCuttingPlanDoc = (
  order: Partial<Order>,
): CuttingPlanDocumentProps | null => {
  if (!order.client || !order.projects) return null;

  const reportProjects: ProjectPlanProps[] = order.projects
    .map((project) => {
      const projectQtde = Number(project.qtde ?? 1);

      const m2Pieces = project.pieces.filter(
        (piece) =>
          piece.material.measureType === "M2" &&
          Array.isArray(piece.measure) &&
          piece.measure.length === 2 &&
          piece.measure[0] > 0 &&
          piece.measure[1] > 0 &&
          Array.isArray(piece.material.measure) &&
          piece.material.measure.length === 2 &&
          piece.material.measure[0] > 0 &&
          piece.material.measure[1] > 0,
      );

      if (m2Pieces.length === 0) return null;

      const materials: MaterialPlanProps[] = m2Pieces.reduce(
        (acc: MaterialPlanProps[], piece) => {
          const { material } = piece;
          if (!material?.id) return acc;

          const matMeasure = material.measure as [number, number];
          const matKey = `${material.id}-${matMeasure[0]}x${matMeasure[1]}`;

          let mat = acc.find((m) => (m as any)._key === matKey);
          if (!mat) {
            mat = {
              id: material.id,
              name: material.name ?? "Material sem nome",
              code: material.code ?? "N/A",
              cutDirection: material.cutDirection ?? "V",
              cutDirectionLabel:
                material.cutDirection === "VH"
                  ? "Corte: Horizontal e vertical"
                  : "Corte: Vertical",
              pieces: [],
              sheets: [],
            };
            (mat as any)._key = matKey;
            (mat as any)._sheetMeasure = matMeasure;
            acc.push(mat);
          }

          const totalQtde = Number(piece.qtde ?? 1) * projectQtde;

          const piecePlan: PiecePlanProps = {
            id: piece.id ?? crypto.randomUUID(),
            label: piece.name ?? "Peça",
            qtde: totalQtde,
            material: {
              id: material.id,
              name: material.name ?? "Material sem nome",
              code: material.code ?? "N/A",
            },
          };

          (piecePlan as any)._measure = piece.measure;
          mat.pieces.push(piecePlan);
          return acc;
        },
        [],
      );

      materials.forEach((mat) => {
        if (mat.pieces.length === 0) return;

        const [sheetW, sheetH] = (mat as any)._sheetMeasure as [number, number];

        const items = mat.pieces.flatMap((p) => {
          const [w, h] = (p as any)._measure;
          const qtdeNum = Number(p.qtde) || 1;
          return Array.from({ length: qtdeNum }, () => ({
            name: p.label,
            w,
            h,
          }));
        });

        const cuttingPlan = new CuttingPlan({
          sheetW,
          sheetH,
          items,
          margin: 0.01,
          pieceSpacing: 0,
          allowRotate: mat.cutDirection === "VH" || mat.cutDirection === "V",
          wastePercentage: (mat as any).material?.wastePercentage ?? 5,
        });

        const result = cuttingPlan.calculate({ includeImages: true });

        mat.sheets = result.base64Images.map((img, i) => ({
          id: `sheet-${i}`,
          label: `Chapa ${i + 1}`,
          imageBase64: img,
        }));
      });

      return {
        id: project.id ?? crypto.randomUUID(),
        name: project.name ?? "Projeto sem nome",
        qtde: projectQtde,
        materials: materials.filter((m) => m.pieces.length > 0),
      };
    })
    .filter((proj): proj is ProjectPlanProps => !!proj);

  console.log({
    quoteCode: order.code ?? "N/A",
    planCode: `P${order.code ?? Math.floor(Math.random() * 100000)}`,
    title: "Plano de corte",
    generationDate: formatDate(order.initialDate),
    projects: reportProjects,
    notes: order.notes ?? "",
  });

  return {
    client: {
      name: order.client.name,
      code: order.client.code,
    },
    plan: {
      quoteCode: order.code ?? "N/A",
      planCode: `P${order.code ?? Math.floor(Math.random() * 100000)}`,
      title: "Plano de corte",
      generationDate: formatDate(order.initialDate),
      projects: reportProjects,
      notes: order.notes ?? "",
    },
  };
};
