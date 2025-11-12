import { CuttingPlan } from "@/lib/cutting-plan";
import type {
  CuttingPlanDocumentProps,
  MaterialPlanProps,
} from "@/pdfs/_docs/cutting-plan-document";
import { formatDate } from "./format-date";

export const mapOrderToCuttingPlanDoc = (
  order: Partial<Order>,
): CuttingPlanDocumentProps => {
  const projects = order.projects ?? [];

  const materialMap = new Map<
    string,
    MaterialPlanProps & { _sheetMeasure: [number, number] }
  >();

  projects.forEach((project) => {
    const projectQtde = Number(project.qtde ?? 1);

    project.pieces.forEach((piece) => {
      const { material } = piece;
      if (
        !material?.id ||
        material.measureType !== "M2" ||
        !Array.isArray(piece.measure) ||
        piece.measure.length !== 2 ||
        piece.measure[0] <= 0 ||
        piece.measure[1] <= 0 ||
        !Array.isArray(material.measure) ||
        material.measure.length !== 2 ||
        material.measure[0] <= 0 ||
        material.measure[1] <= 0
      ) {
        return;
      }

      const matMeasure = material.measure as [number, number];
      const matKey = `${material.id}-${matMeasure[0]}x${matMeasure[1]}`;

      if (!materialMap.has(matKey)) {
        materialMap.set(matKey, {
          id: material.id,
          name: material.name ?? "Material sem nome",
          code: material.code ?? "N/A",
          cutDirection: material.cutDirection ?? "V",
          cutDirectionLabel:
            material.cutDirection === "VH"
              ? "Corte: Horizontal e vertical"
              : "Corte: Horizontal",
          pieces: [],
          sheets: [],
          sheetMeasure: matMeasure,
          _sheetMeasure: matMeasure,
        });
      }

      const matEntry = materialMap.get(matKey)!;
      const totalQtde = Number(piece.qtde ?? 1) * projectQtde;

      matEntry.pieces.push({
        id: piece.id ?? crypto.randomUUID(),
        label: piece.name ?? "Peça",
        qtde: totalQtde,
        material: {
          id: material.id,
          name: material.name ?? "Material sem nome",
          code: material.code ?? "N/A",
        },
        ...({ _measure: piece.measure } as any),
      });
    });
  });

  const materials: MaterialPlanProps[] = [];

  materialMap.forEach((mat) => {
    if (mat.pieces.length === 0) return;

    const [sheetW, sheetH] = mat._sheetMeasure;

    const items = mat.pieces.flatMap((p) => {
      const [w, h] = (p as any)._measure;
      return Array.from({ length: p.qtde as number }, () => ({
        name: p.label,
        w,
        h,
      }));
    });

    const cuttingPlan = new CuttingPlan({
      sheetW,
      sheetH,
      items,
      margin: 1,
      pieceSpacing: 0,
      allowRotate: mat.cutDirection === "VH",
      wastePercentage: 5,
    });

    const result = cuttingPlan.calculate({ includeImages: true });

    mat.sheets = result.base64Images.map((img, i) => ({
      id: `sheet-${i}`,
      label: `Chapa ${i + 1}`,
      imageBase64: img,
      sheetMeasure: mat._sheetMeasure,
    }));

    materials.push(mat);
  });

  return {
    client: {
      name: order.client?.name ?? "",
      code: order.client?.code ?? "N/A",
    },
    plan: {
      quoteCode: order.code ?? "N/A",
      planCode: order.code ?? "",
      title: `Plano de corte - ${order.name}`,
      generationDate: formatDate(order.initialDate),
      projects: [
        ...projects.map((p) => ({
          id: p.id ?? crypto.randomUUID(),
          name: p.name ?? "Projeto sem nome",
          qtde: Number(p.qtde ?? 1),
          materials: [],
        })),
        {
          id: "grouped",
          name: "Todos os projetos",
          qtde: 1,
          materials,
        },
      ],
      notes: order.notes ?? "",
    },
  };
};
