import { fetchPieces } from "@/modules/piece/utils/utils";
import { getProductByIdService } from "@/modules/products/products-service";
import { generateId } from "@/utils/idGenerator"; // para gerar cutPlan_id
import { generateSheetsSVG } from "../drawCanva/draw-canvas-utils";
import type { CleanSheet } from "../schemas/schema";
import { appendCuttingPlanService } from "../service/cutPlan-services";
import { packMaxRects, type Sheet } from "./packing-utils";
import { calculateSheetMetrics } from "./waste-rate-utils";

type Product = {
  product_id: string;
  product_measurements: string; // exemplo: "m²" ou "m"
};

export async function generateSheetsForProject(
  project_id: string,
  sheetW: number,
  sheetH: number,
  defaultMargin = 30,
): Promise<{
  message: string;
  totalSheets: number;
  totalWasteRate: number;
  sheets: CleanSheet[];
  imageUrl: string;
}> {
  // Buscar peças do projeto
  const pieces = await fetchPieces(project_id);
  if (!pieces || pieces.length === 0) {
    throw new Error("Nenhuma peça encontrada");
  }

  // Extrair IDs únicos de produtos
  const productIds = [
    ...new Set(
      pieces
        .map((p) => p.product_id?.product_id)
        .filter((id): id is string => Boolean(id)),
    ),
  ];

  // Buscar produtos no back
  const products = await Promise.all(
    productIds.map((id) => getProductByIdService(id)),
  );

  // Criar mapa de produtos válidos
  const productMap = new Map<string, Product>();
  for (const res of products) {
    if ("data" in res && res.data && !("error" in res.data)) {
      const product = res.data as Product;
      productMap.set(product.product_id, product);
    } else {
      console.warn("Produto não encontrado ou erro:", res);
    }
  }

  // Validar tipo de medida das peças
  productMap.forEach((product, id) => {
    console.log(`ID: ${id}, Tipo de medida: ${product.product_measurements}`);
    if (
      product.product_measurements !== "m2" &&
      product.product_measurements !== "m"
    ) {
      throw new Error(
        `Produto ${id} possui tipo de medida inválido: ${product.product_measurements}`,
      );
    }
  });

  // Gerar chapas (packing)
  const rawSheets: Sheet[] = packMaxRects(
    sheetW,
    sheetH,
    pieces,
    defaultMargin,
  );
  const { imageUrl } = generateSheetsSVG(rawSheets, defaultMargin);

  // Calcular métricas e preparar CleanSheet
  const sheets: CleanSheet[] = rawSheets.map((sheet) => {
    const { used, totalArea, usedArea, wasteRate } = calculateSheetMetrics(
      sheet,
      defaultMargin,
    );
    return {
      width: sheet.w,
      height: sheet.h,
      used,
      freeSpace: { totalArea, usedArea, wasteRate },
    };
  });

  // Calcular taxa de desperdício total
  const totalAreaAllSheets = sheets.reduce(
    (sum, s) => sum + s.width * s.height,
    0,
  );
  const totalUsedArea = sheets.reduce(
    (sum, s) => sum + s.freeSpace.usedArea,
    0,
  );
  const totalWasteRate =
    ((totalAreaAllSheets - totalUsedArea) / totalAreaAllSheets) * 100;

  // Gerar ID do plano de corte
  const cutPlan_id = await generateId("CUT");

  // Montar payload para inserção no Supabase
  const cuttingPlanPayload = {
    cutPlan_id,
    project_id,
    cutPlan_total_sheets: sheets.length,
    cutPlan_total_waste_rate: totalWasteRate,
    cutPlan_image_url: imageUrl,
  };

  try {
    console.log("Payload para inserção no Supabase:", cuttingPlanPayload);
    const cuttingPlanResult =
      await appendCuttingPlanService(cuttingPlanPayload);
    console.log("Plano de corte criado:", cuttingPlanResult);
  } catch (err) {
    console.error("Erro ao criar plano de corte:", err);
  }

  // Retornar resultado
  return {
    message: "Chapas geradas com sucesso",
    totalSheets: sheets.length,
    totalWasteRate,
    sheets,
    imageUrl,
  };
}
