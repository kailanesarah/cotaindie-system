import Table from "./primary-table";

interface ClientesSectionProps {
  clientesLinhas: Partial<any>[]; // array de dados já formatados
}

export function ClientesSection({ clientesLinhas }: ClientesSectionProps) {
  if (!clientesLinhas || clientesLinhas.length === 0) return null;

  return <Table items={clientesLinhas} />;
}
