import { COLUNAS_MATERIAIS } from "../types/pdfColumns";
import { SectionTable } from "./section-table";

interface MateriaisSectionProps {
  materiaisDados: any[];
  totalMateriais?: number;
}

export function MateriaisSection({
  materiaisDados,
  totalMateriais,
}: MateriaisSectionProps) {
  if (!materiaisDados || materiaisDados.length === 0) return null;

  return (
    <SectionTable
      title=""
      columns={COLUNAS_MATERIAIS}
      data={materiaisDados} // objetos já formatados
      total={totalMateriais}
      largurasFixas={[80, 220, 60, 60, 90, 90, 90]} // soma = 515
    />
  );
}
