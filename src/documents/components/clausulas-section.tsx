import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Text, View } from "@react-pdf/renderer";

interface ClausulasSectionProps {
  clausulas: string[];
}

export const ClausulasSection = ({ clausulas }: ClausulasSectionProps) => (
  <View wrap={false} style={pdfStyles.mbLg}>
    {clausulas.map((clausula, idx) => (
      <Text
        key={idx}
        style={[
          pdfStyles.body,
          { textAlign: "justify", lineHeight: 1.4, marginBottom: 4 },
        ]}
      >
        {clausula}
      </Text>
    ))}
  </View>
);
