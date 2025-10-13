import type { pieceInput } from "@/modules/piece/schemas/pieces-schemas";
import { COLUNAS_PECAS } from "../types/pdfColumns";
import { SectionTable } from "./section-table";

interface PecasSectionProps {
  pecasDados: pieceInput[];
}

export function PecasSection({ pecasDados }: PecasSectionProps) {
  if (!pecasDados || pecasDados.length === 0) return null;

  return <SectionTable title="" columns={COLUNAS_PECAS} data={pecasDados} />;
}
