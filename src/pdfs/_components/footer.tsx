import { Image, Text, View } from "@react-pdf/renderer";
import { Hr } from "./hr";

interface FooterProps {
  variant: "quote" | "default";
  pageNumber: number;
  totalPages: number;
}

export const Footer = ({
  variant,
  pageNumber,
  totalPages,
}: Readonly<FooterProps>) => {
  const quoteText = "Orçamento gerado em 10/08/2025 - Válido por 7 dias";
  const defaultText = "";

  const footerText = variant === "quote" ? quoteText : defaultText;

  return (
    <View style={{ paddingTop: 10 }}>
      <Hr />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 8,
        }}
      >
        <View style={{ width: 66, height: 18 }}>
          <Image
            src="/images/logo-pdf.png"
            style={{ width: 64.5, height: 17 }}
          />
          {/* <Logo /> */}
        </View>
        <Text>
          {footerText ? `${footerText} | ` : ""}
          Página {pageNumber} de {totalPages}
        </Text>
      </View>
    </View>
  );
};
