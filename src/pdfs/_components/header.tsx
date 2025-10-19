import { Text, View } from "@react-pdf/renderer";

interface HeaderProps {
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
}: Readonly<HeaderProps>) => (
  <View
    style={{
      flexDirection: "row",
      gap: 16,
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
      <View style={{ width: 350, fontSize: 8, lineHeight: 1.4 }}>
        <Text>
          Documento emitido em {dateTime} com base no orçamento/pedido de
          código: {docCode || "C29115"}
        </Text>
      </View>
    )}
    {variant === "detailed" && companyInfo && (
      <View style={{ width: 350, fontSize: 8, lineHeight: 1.4 }}>
        <Text>
          <Text style={{ fontWeight: 700 }}>Empresa: </Text>
          {companyInfo.name} - <Text>{companyInfo.details}</Text>
          <Text style={{ fontWeight: 700 }}>Endereço: </Text> -{" "}
          {companyInfo.address} -{" "}
          <Text style={{ fontWeight: 700 }}>Whatsapp: </Text>
          {companyInfo.phone}
        </Text>
      </View>
    )}
  </View>
);
