import PrimaryTable from "./primary-table";

interface ContratadaSectionProps {
  empresaData: any[];
}

export const ContratadaSection = ({ empresaData }: ContratadaSectionProps) => (
  <PrimaryTable items={empresaData} />
);
