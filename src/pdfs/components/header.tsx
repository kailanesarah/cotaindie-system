import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Text, View } from "@react-pdf/renderer";
import { type EmpresaInfo } from "../types/simple-header";

export default function Header({ data }: { data: EmpresaInfo }) {
  return (
    <View style={pdfStyles.headerContainer}>
      {/* Coluna da logo */}
      <View style={pdfStyles.headerLogoColumn}>
        <Text style={{ ...pdfStyles.h2, fontWeight: "bold" }}>LOGO</Text>
      </View>

      {/* Coluna das informações do cliente */}
      <View style={pdfStyles.headerInfoColumn}>
        <Text style={pdfStyles.headerText}>
          <Text style={pdfStyles.headerTextBold}>Cliente: </Text>
          {data.nome}
          {" | "}
          <Text style={pdfStyles.headerTextBold}>CNPJ: </Text>
          {data.cnpj}
          {" | "}
          {data.whatsapp && (
            <>
              <Text style={pdfStyles.headerTextBold}>Whatsapp: </Text>
              {data.whatsapp}
              {" | "}
            </>
          )}
          {data.pmf && data.ie && (
            <>
              <Text style={pdfStyles.headerTextBold}>PMF: </Text>
              {data.pmf}
              {" - "}
              <Text style={pdfStyles.headerTextBold}>I.E: </Text>
              {data.ie}
              {" | "}
            </>
          )}
          <Text style={pdfStyles.headerTextBold}>Endereço: </Text>
          {data.endereco} - {data.cidade} - {data.estado} {data.cep}
        </Text>
      </View>
    </View>
  );
}
