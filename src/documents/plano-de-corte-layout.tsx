// ===== Imports de tipos =====
import type { ClientInput } from "@/modules/clients/schema/clients-schema";
import type { pieceInput } from "@/modules/piece/schemas/pieces-schemas";
import type { InformacoesAdicionais } from "./types/infos-adicionais";
import type { EmpresaInfo } from "./types/simple-header";

// ===== Imports de estilos e PDF renderer =====
import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";

// ===== Imports de componentes =====
import Footer from "./components/footer";
import Header from "./components/header";
import MaterialsTable from "./components/materials-table";
import Table from "./components/primary-table";
import { formatarDadosParaPDF } from "./utils/formatar-dados-pdf";

const PlanoDeCorteLayout = ({
  empresa,
  clients,
  pieces,
  cutPlanURL,
  MaterialsData,
  informacoesAdicionais, // opcional
}: {
  empresa: EmpresaInfo[];
  clients: ClientInput[];
  pieces: pieceInput[];
  cutPlanURL: string;
  MaterialsData: any[]; // genérico, pode ajustar depois
  informacoesAdicionais?: InformacoesAdicionais[]; // opcional
}) => {
  const { clientesLinhas, pecasDados, projetosDados } = formatarDadosParaPDF({
    clients,
    pieces,
  });

  const primeiraInfo = informacoesAdicionais?.[0]; // pega só a primeira

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page} wrap>
        {/* Header */}
        <Header data={empresa[0]} />

        <View style={{ flexDirection: "column", flexGrow: 1 }}>
          {/* Seção: Clientes */}
          <View style={pdfStyles.mbLg}>
            <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>Clientes</Text>
            <Table items={clientesLinhas} />
          </View>

          {/* Seção: Materiais */}
          <View style={pdfStyles.mbLg}>
            <Text style={pdfStyles.boldBody}>Materiais</Text>
            <MaterialsTable data={MaterialsData} />
          </View>

          {/* Seção: Plano de Corte */}
          <View style={pdfStyles.mbLg}>
            <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>
              Plano de Corte
            </Text>
            <View style={pdfStyles.cutPlanContainer}>
              <Text style={pdfStyles.cutPlanLabel}>
                Imagem do Plano de Corte
              </Text>
              <Image src={cutPlanURL} style={pdfStyles.cutPlanImage} />
            </View>
          </View>

          {/* Informações adicionais */}
          {primeiraInfo?.observacoes && (
            <View style={pdfStyles.mbLg}>
              <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>
                Informações adicionais
              </Text>
              <Text style={pdfStyles.small}>
                Observações: {primeiraInfo.observacoes}
              </Text>
            </View>
          )}
        </View>

        {/* Footer com número de página */}
        <View style={pdfStyles.footerContainer} fixed>
          <Footer />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              flexGrow: 1,
            }}
          >
            <Text
              render={({ pageNumber, totalPages }) =>
                `Página ${pageNumber} de ${totalPages}`
              }
              style={{ textAlign: "right" }}
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PlanoDeCorteLayout;
