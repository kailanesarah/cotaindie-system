export type CleanSheet = {
  width: number;
  height: number;
  used: {
    name: string;
    width: number;
    height: number;
    x: number;
    y: number;
    rotated: boolean;
    oversize?: boolean;
    displayWidth: number;
    displayHeight: number;
    margin: number;
  }[];
  freeSpace: {
    totalArea: number;
    usedArea: number;
    wasteRate: number; // percentual 0-100
  };
};

import { z } from "zod";

export const cuttingPlanSchema = z.object({
  cutPlan_id: z.string(),
  cutPlan_total_sheets: z
    .number()
    .int()
    .nonnegative("O total de chapas não pode ser negativo"),
  cutPlan_total_waste_rate: z
    .number()
    .min(0, "A taxa de desperdício não pode ser negativa")
    .max(100, "A taxa de desperdício não pode exceder 100"),
  cutPlan_image_url: z.string(),
});

export type CuttingPlanInput = z.infer<typeof cuttingPlanSchema>;
