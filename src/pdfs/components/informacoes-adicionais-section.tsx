import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Text, View } from "@react-pdf/renderer";

interface InformacoesAdicionaisSectionProps {
  infos: any[];
}

export function InformacoesAdicionaisSection({
  infos,
}: InformacoesAdicionaisSectionProps) {
  if (!infos || infos.length === 0) return null;

  return (
    <View style={pdfStyles.mbLg}>
      {infos.map((info, index) => (
        <View key={index} style={{ marginBottom: pdfStyles.mbMd.marginBottom }}>
          <View style={pdfStyles.mbSm}>
            <Text style={pdfStyles.bold}>Materiais inclusos:</Text>
            <Text>{info.materiaisInclusos ?? ""}</Text>
          </View>

          <View style={pdfStyles.mbSm}>
            <Text style={pdfStyles.bold}>Materiais não inclusos:</Text>
            <Text>{info.materiaisExclusos ?? ""}</Text>
          </View>

          <View style={pdfStyles.mbSm}>
            <Text style={pdfStyles.bold}>Observações (equipe interna):</Text>
            <Text>{info.observacoesEquipeInterna ?? ""}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
