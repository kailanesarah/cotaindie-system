import { Text, View } from "@react-pdf/renderer";

interface SignatureBlockProps {
  partyA: string;
  partyB: string;
  date: string;
}
export const SignatureBlock = ({
  partyA,
  partyB,
  date,
}: Readonly<SignatureBlockProps>) => (
  <View style={{ marginTop: 60, fontSize: 9 }} wrap={false}>
    <Text style={{ textAlign: "center", marginBottom: 40 }}>{date}</Text>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ width: "45%", textAlign: "center" }}>
        <View style={{ height: 1, backgroundColor: "#000", marginBottom: 4 }} />
        <Text
          style={{
            fontFamily: "Helvetica-Bold",
            fontSize: 8,
            textTransform: "uppercase",
          }}
        >
          CONTRATADA
        </Text>
        <Text style={{ fontSize: 9, marginTop: 2 }}>{partyA}</Text>
      </View>
      <View style={{ width: "45%", textAlign: "center" }}>
        <View style={{ height: 1, backgroundColor: "#000", marginBottom: 4 }} />
        <Text
          style={{
            fontFamily: "Helvetica-Bold",
            fontSize: 8,
            textTransform: "uppercase",
          }}
        >
          CONTRATANTE
        </Text>
        <Text style={{ fontSize: 9, marginTop: 2 }}>{partyB}</Text>
      </View>
    </View>
  </View>
);
