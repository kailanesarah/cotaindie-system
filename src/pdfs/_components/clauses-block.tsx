import { Text, View } from "@react-pdf/renderer";
import { SectionTitle } from "./section-title";

interface ClauseItem {
  id: string;
  text: string;
}

interface ClausesBlockProps {
  title: string;
  items: ClauseItem[];
}

export const ClausesBlock = ({ title, items }: Readonly<ClausesBlockProps>) => (
  <View wrap={false}>
    <SectionTitle>{title}</SectionTitle>
    {items.map((item) => (
      <View key={item.id} style={{ marginBottom: 8 }}>
        <Text style={{ fontSize: 9, lineHeight: 1.4 }}>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>{item.id}) </Text>
          {item.text}
        </Text>
      </View>
    ))}
  </View>
);
