// ===== Imports de tipos =====
import type { ClientInput } from "@/modules/clients/schema/clients-schema";
import type { projectInput } from "@/modules/projects/schemas/project-schema";
import type { InformacoesAdicionais } from "@/modules/quotation/schemas/additional-info-schema ";
import type { CondicoesPagamento } from "@/modules/quotation/schemas/payment-conditions-schema";
import type { EmpresaInfo } from "./types/simple-header";

// ===== Imports de estilos e PDF renderer =====
import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Document, Page, Text, View } from "@react-pdf/renderer";

// ===== Imports de componentes =====
import { CondicoesPagamentoSection } from "./components/condicoes-pagamento-section";
import Footer from "./components/footer";
import Header from "./components/header";
import { InformacoesAdicionaisSection } from "./components/informacoes-adicionais-section";
import PrimaryTable from "./components/primary-table";
import { SectionTable } from "./components/section-table";

// ===== Imports de utilitários =====
import SectionTitleWithCode from "./components/tittle-section";
import { COLUNAS_PROJETOS } from "./constants/pdfColumns";
import { formatarDadosParaPDF } from "./utils/formatar-dados-pdf";

interface ModeloOrcamentoProps {
  clients: ClientInput[];
  empresa: EmpresaInfo[];
  projects: projectInput[];
  informacoesAdicionais?: InformacoesAdicionais | InformacoesAdicionais[];
  condicoesPagamentoData?: CondicoesPagamento[];
}

export const ModeloOrcamentoLayout = ({
  clients,
  empresa,
  projects,
  informacoesAdicionais,
  condicoesPagamentoData,
}: ModeloOrcamentoProps) => {
  const { clientesLinhas, projetosDados, condicoesPagamentoLinhas } =
    formatarDadosParaPDF({
      clients,
      projects,
      condicoesPagamento: condicoesPagamentoData,
    });

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

        <SectionTitleWithCode code="C29115" title="Orçamento do projeto" />

        <View style={{ flexDirection: "column", flexGrow: 1 }}>
          {/* Dados do Cliente */}
          <View style={pdfStyles.mbLg}>
            <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>
              Dados do(a) cliente
            </Text>
            <PrimaryTable items={clientesLinhas} />
          </View>

          {/* Projetos */}
          <View style={pdfStyles.mtLg}>
            <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>
              Projetos inclusos
            </Text>
            <SectionTable
              title=""
              columns={COLUNAS_PROJETOS}
              data={projetosDados}
            />
          </View>

          {/* Informações Adicionais */}

          <View style={pdfStyles.mtLg}>
            <Text style={[pdfStyles.h3, pdfStyles.mtLg]}>
              Informações Adicionais
            </Text>
            <InformacoesAdicionaisSection infos={infosArray} />
          </View>

          {/* Condições de Pagamento */}

          <View style={pdfStyles.mbLg}>
            <Text style={pdfStyles.boldBody}>Condições de pagamento</Text>
            <CondicoesPagamentoSection
              condicoesPagamentoData={condicoesPagamentoLinhas}
            />
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

export default ModeloOrcamentoLayout;
