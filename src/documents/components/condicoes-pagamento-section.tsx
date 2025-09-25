import PrimaryTable from "./primary-table";

interface CondicoesPagamentoSectionProps {
  condicoesPagamentoData: any[];
}

export function CondicoesPagamentoSection({
  condicoesPagamentoData,
}: CondicoesPagamentoSectionProps) {
  if (!condicoesPagamentoData || condicoesPagamentoData.length === 0)
    return null;

  return <PrimaryTable items={condicoesPagamentoData} />;
}
