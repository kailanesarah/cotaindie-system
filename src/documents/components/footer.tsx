// Footer.tsx
import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // centraliza verticalmente
  },

  right: {
    flexDirection: "column",
    textAlign: "right",
  },
  left: {
    flexDirection: "column", // empilha logo e datas
    alignItems: "flex-start",
  },
});

export default function Footer() {
  const now = new Date();
  const validade = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const validadeFormatted = validade.toLocaleDateString("pt-BR");
  const generatedAt = now.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.container} fixed>
      <View style={styles.left}>
        <Text style={pdfStyles.boldBody}>LOGO</Text>
      </View>

      <View style={styles.left}>
        <Text style={pdfStyles.small}>
          Gerado em: {generatedAt}. Valido por 7 dias{" "}
        </Text>
      </View>
    </View>
  );
}
