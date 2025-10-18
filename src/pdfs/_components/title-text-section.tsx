import { Text, View } from "@react-pdf/renderer";
import React from "react";

interface TitledTextSectionProps {
  title: string;
  children: React.ReactNode;
}
export const TitledTextSection = ({
  title,
  children,
}: Readonly<TitledTextSectionProps>) => (
  <View style={{ marginTop: 12 }} wrap={false}>
    <Text
      style={{ fontSize: 10, fontFamily: "Helvetica-Bold", marginBottom: 4 }}
    >
      {title}
    </Text>
    <Text style={{ fontSize: 9, lineHeight: 1.4 }}>{children}</Text>
  </View>
);
