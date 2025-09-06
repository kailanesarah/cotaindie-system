import type { badgeVariants } from "@/components/ui/badge";
import type { VariantProps } from "class-variance-authority";
import { statusList } from "./status-list";

type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

export const statusMap: Record<
  (typeof statusList)[number]["id"],
  { text: string; type: BadgeVariant }
> = {
  open: {
    text: "Apenas cotado",
    type: "alert",
  },
  approved: {
    text: "Pedido finalizado",
    type: "success",
  },
};
