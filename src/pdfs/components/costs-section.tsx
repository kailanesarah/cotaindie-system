import { COLUNAS_CUSTOS } from "../types/pdfColumns";
import { SectionTable } from "./section-table";

interface CustosSectionProps {
  custosDados: any[];
  totalCustos?: number;
}

export function CustosSection({
  custosDados,
  totalCustos,
}: CustosSectionProps) {
  if (!custosDados || custosDados.length === 0) return null;

  return (
    <SectionTable
      title=""
      columns={COLUNAS_CUSTOS}
      data={custosDados}
      total={totalCustos}
      largurasFixas={[80, 220, 90, 65, 80]} // soma = 515
    />
  );
}
