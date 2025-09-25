import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Text, View } from "@react-pdf/renderer";
import { SecondaryTable } from "./secondary-table";

interface SectionTableProps {
  title: string;
  columns: string[];
  data: any[];
  total?: string | number;
}

export const SectionTable = ({
  title,
  columns,
  data,
  total,
}: SectionTableProps) => (
  <View style={pdfStyles.mtLg}>
    <Text style={pdfStyles.boldBody}>{title}</Text>
    <SecondaryTable colunas={columns} dados={data} />
    {total && (
      <Text style={[pdfStyles.boldBody, pdfStyles.mtMd]}>Total: {total}</Text>
    )}
  </View>
);
