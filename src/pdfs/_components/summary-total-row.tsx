import { Text, View } from "@react-pdf/renderer";

export const SummaryTotalRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 8,
    }}
  >
    <Text
      style={{ fontFamily: "Helvetica-Bold", fontSize: 10, marginRight: 10 }}
    >
      {label}
    </Text>
    <Text
      style={{
        fontFamily: "Helvetica-Bold",
        fontSize: 10,
        width: 70,
        textAlign: "right",
      }}
    >
      {value}
    </Text>
  </View>
);
