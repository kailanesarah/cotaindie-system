// src/components/SectionTitleWithCode.tsx
import { colors } from "@/styles/pdf_styles/pdfColors";
import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Text, View } from "@react-pdf/renderer";

interface SectionTitleWithCodeProps {
  code: string;
  title: string;
}

export const SectionTitleWithCode = ({
  code,
  title,
}: SectionTitleWithCodeProps) => {
  return (
    <View
      style={{
        ...pdfStyles.mbLg,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text
        style={{ ...pdfStyles.h3, color: colors.redDarker, marginRight: 4 }}
      >
        {code} -{" "}
      </Text>
      <Text style={pdfStyles.h3}>{title}</Text>
    </View>
  );
};

export default SectionTitleWithCode;
