import { COLUNAS_PROJETOS } from "../constants/pdfColumns";
import { SectionTable } from "./section-table";

interface ProjetosSectionProps {
  projetosDados: any[];
}

export function ProjetosSection({ projetosDados }: ProjetosSectionProps) {
  if (!projetosDados || projetosDados.length === 0) return null;

  return (
    <SectionTable
      title=""
      columns={COLUNAS_PROJETOS}
      data={projetosDados}
      largurasFixas={[80, 220, 80, 90, 90]} // soma = 515
    />
  );
}
