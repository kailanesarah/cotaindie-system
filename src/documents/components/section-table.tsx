// section-table.tsx
import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Text, View } from "@react-pdf/renderer";
import { SecondaryTable } from "./secondary-table";

interface SectionTableProps {
  title: string;
  columns: string[];
  data: any[];
  total?: string | number;
  margin?: number; // margem opcional em pt
  largurasFixas?: number[]; // ✅ adiciona aqui
}

export const SectionTable = ({
  title,
  columns,
  data,
  total,
  margin = 0,
  largurasFixas, // ✅ recebe
}: SectionTableProps) => (
  <View style={[{ marginLeft: margin, marginRight: margin }]}>
    <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>{title}</Text>
    <SecondaryTable
      title=""
      columns={columns}
      data={data}
      largurasFixas={largurasFixas}
    />{" "}
    {/* ✅ passa adiante */}
    {total && (
      <Text style={[pdfStyles.body, pdfStyles.mtMd]}>Total: {total}</Text>
    )}
  </View>
);
