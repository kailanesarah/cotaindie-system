import { Text, View } from "@react-pdf/renderer";

interface DocumentTitleProps {
  code?: string;
  title: string;
}
export const DocumentTitle = ({
  code,
  title,
}: Readonly<DocumentTitleProps>) => {
  return (
    <View style={{ marginTop: 15, marginBottom: 10 }}>
      <Text style={{ fontSize: 16, fontFamily: "Helvetica-Bold" }}>
        {code && <Text style={{ color: "#cc0000" }}>C{code}</Text>}
        {code && <Text style={{ color: "#262626" }}> - </Text>}
        <Text style={{ color: "#262626" }}>{title}</Text>
      </Text>
    </View>
  );
};
