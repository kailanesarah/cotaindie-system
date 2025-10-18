import { Text, View } from "@react-pdf/renderer";

interface SummaryBlockProps {
  discountLabel?: string;
  orderValue: string;
  discountValue: string;
  totalValue: string;
}

export const SummaryBlock = ({
  discountLabel,
  orderValue,
  discountValue,
  totalValue,
}: Readonly<SummaryBlockProps>) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
      fontSize: 9,
    }}
  >
    <View style={{ width: "50%", paddingTop: 16 }}>
      {discountLabel && <Text>{discountLabel}</Text>}
    </View>
    <View style={{ width: "50%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 4,
        }}
      >
        <Text>Valor do pedido:</Text>
        <Text>{orderValue}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 4,
        }}
      >
        <Text>Valor do desconto:</Text>
        <Text>{discountValue}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 6,
          borderTopWidth: 1,
          borderColor: "#e0e0e0",
          marginTop: 4,
        }}
      >
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 11 }}>
          Valor a pagar:
        </Text>
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 11 }}>
          {totalValue}
        </Text>
      </View>
    </View>
  </View>
);
