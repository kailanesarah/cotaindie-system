import { Text, View } from "@react-pdf/renderer";

interface AppHeaderProps {
  variant: "simple" | "detailed";
  docCode?: string;
  dateTime: string;
  companyInfo?: {
    name: string;
    details: string;
    address: string;
    phone: string;
  };
}

export const Header = ({
  variant,
  docCode,
  dateTime,
  companyInfo,
}: Readonly<AppHeaderProps>) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 8,
    }}
  >
    <View
      style={{
        width: 120,
        height: 50,
        border: "1px dashed #a0a0a0",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 8, color: "#a0a0a0" }}>
        Insira sua logo aqui
      </Text>
    </View>

    {variant === "simple" && (
      <View
        style={{ width: 350, textAlign: "right", fontSize: 8, lineHeight: 1.4 }}
      >
        <Text>
          Documento emitido em {dateTime} com base no orçamento/pedido de
          código: {docCode || "C29115"}
        </Text>
      </View>
    )}

    {variant === "detailed" && companyInfo && (
      <View
        style={{ width: 350, textAlign: "left", fontSize: 8, lineHeight: 1.4 }}
      >
        <Text>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>Empresa: </Text>
          {companyInfo.name} -{" "}
          <Text style={{ fontFamily: "Helvetica" }}>{companyInfo.details}</Text>
        </Text>
        <Text>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>Endereço: </Text>
          {companyInfo.address}
        </Text>
        <Text>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>Whatsapp: </Text>
          {companyInfo.phone}
        </Text>
        <Text>
          <Text style={{ fontFamily: "Helvetica-Bold" }}>Emitido em: </Text>
          {dateTime}
        </Text>
      </View>
    )}
  </View>
);
