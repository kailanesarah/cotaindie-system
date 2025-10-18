import { Text } from "@react-pdf/renderer";
import React from "react";

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Text
    style={{
      fontSize: 10,
      fontFamily: "Helvetica-Bold",
      marginBottom: 4,
      marginTop: 12,
    }}
  >
    {children}
  </Text>
);
