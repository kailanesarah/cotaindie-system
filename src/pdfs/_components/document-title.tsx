import { Text, View } from "@react-pdf/renderer";

interface DocumentTitleProps {
  code: string;
  title: string;
}
export const DocumentTitle = ({
  code,
  title,
}: Readonly<DocumentTitleProps>) => (
  <View style={{ marginTop: 15, marginBottom: 10 }}>
    <Text style={{ fontSize: 16, fontFamily: "Helvetica-Bold" }}>
      <Text style={{ color: "#cc0000" }}>{code}</Text>
      <Text style={{ color: "#262626" }}> - {title}</Text>
    </Text>
  </View>
);
