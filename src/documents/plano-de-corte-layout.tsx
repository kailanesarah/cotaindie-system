// ===== Imports de tipos =====
import type { ClientInput } from "@/modules/clients/schema/clients-schema";
import type { pieceInput } from "@/modules/piece/schemas/pieces-schemas";
import type { InformacoesAdicionais } from "@/modules/quotation/schemas/additional-info-schema ";
import type { EmpresaInfo } from "./types/simple-header";

// ===== Imports de estilos e PDF renderer =====
import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Document, Image, Page, Text, View } from "@react-pdf/renderer";

// ===== Imports de componentes =====
import Footer from "./components/footer";
import Header from "./components/header";
import { InformacoesAdicionaisSection } from "./components/informacoes-adicionais-section";
import MaterialsTable from "./components/materials-table";
import Table from "./components/primary-table";
import SectionTitleWithCode from "./components/tittle-section";

// ===== Imports de utilitários =====
import type { CondicoesPagamento } from "@/modules/quotation/schemas/payment-conditions-schema";
import { formatarDadosParaPDF } from "./utils/formatar-dados-pdf";
interface PlanoDeCorteLayoutProps {
  empresa: EmpresaInfo[];
  clients: ClientInput[];
  pieces: pieceInput[];
  cutPlanURL: string;
  MaterialsData: any[];
  informacoesAdicionais?: InformacoesAdicionais[];
  clientFields?: (keyof ClientInput)[];
  condicoesPagamentoFields?: (keyof CondicoesPagamento)[];
}

const PlanoDeCorteLayout = ({
  empresa,
  clients,
  pieces,
  cutPlanURL,
  MaterialsData,
  informacoesAdicionais,
  clientFields,
  condicoesPagamentoFields,
}: PlanoDeCorteLayoutProps) => {
  const {
    clientesLinhas,
    pecasDados,
    condicoesPagamentoLinhas, // caso seja necessário futuramente
  } = formatarDadosParaPDF({
    clients,
    pieces,
    clientFields,
    condicoesPagamentoFields,
  });

  // Garante que informacoesAdicionais sempre seja array
  const infosArray = Array.isArray(informacoesAdicionais)
    ? informacoesAdicionais
    : informacoesAdicionais
      ? [informacoesAdicionais]
      : [];
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page} wrap>
        {/* Header */}
        <Header data={empresa[0]} />

        {/* Título principal */}
        <SectionTitleWithCode
          code="P29115"
          title="Plano de Corte e Materiais"
        />

        <View style={{ flexDirection: "column", flexGrow: 1 }}>
          {/* Seção: Clientes */}
          <View style={pdfStyles.mbLg}>
            <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>Clientes</Text>
            <Table items={clientesLinhas} />
          </View>

          {/* Seção: Materiais */}
          <View style={pdfStyles.mbLg}>
            <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>Materiais</Text>
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

          {/* Informações Adicionais */}

          <View style={pdfStyles.mtLg}>
            <Text style={[pdfStyles.h3, pdfStyles.mtLg]}>
              Informações Adicionais
            </Text>
            <InformacoesAdicionaisSection infos={infosArray} />
          </View>
        </View>

        {/* Footer */}
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
