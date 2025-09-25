import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Text, View } from "@react-pdf/renderer";

export const AssinaturasSection = () => (
  <View style={pdfStyles.mtXl}>
    <Text style={[pdfStyles.body, { textAlign: "right", marginBottom: 40 }]}>
      Viçosa do Ceará, 01 de agosto de 2025
    </Text>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 40,
      }}
    >
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text>_________________________________</Text>
        <Text style={{ marginTop: 4 }}>CONTRATADA</Text>
        <Text style={{ marginTop: 4 }}>Paulo César Arruda Aragão</Text>
      </View>
      <View style={{ alignItems: "center", flex: 1 }}>
        <Text>_________________________________</Text>
        <Text style={{ marginTop: 4 }}>CONTRATANTE</Text>
        <Text style={{ marginTop: 4 }}>Cliente exemplo</Text>
      </View>
    </View>
  </View>
);
