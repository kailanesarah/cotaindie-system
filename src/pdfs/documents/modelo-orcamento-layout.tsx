import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Text, View } from "@react-pdf/renderer";

import PDFLayout from "../PDFLayout";
import { CondicoesPagamentoSection } from "../components/condicoes-pagamento-section";
import { InformacoesAdicionaisSection } from "../components/informacoes-adicionais-section";
import PrimaryTable from "../components/primary-table";
import { SectionTable } from "../components/section-table";
import SectionTitleWithCode from "../components/tittle-section";

import { COLUNAS_PROJETOS } from "../types/pdfColumns";
import { getPDFDataFromStore } from "../utils/getPDFDataFromStore";

export const ModeloOrcamentoLayout = () => {
  const {
    empresa,
    clients,
    projects,
    informacoesAdicionais,
    condicoesPagamento,
  } = getPDFDataFromStore();

  return (
    <PDFLayout empresa={empresa}>
      {/* Título */}
      <SectionTitleWithCode code="C29115" title="Orçamento do projeto" />

      {/* Dados do Cliente */}
      <View style={pdfStyles.mbLg}>
        <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>
          Dados do(a) cliente
        </Text>
        <PrimaryTable items={clients} />
      </View>

      {/* Projetos */}
      <View style={pdfStyles.mbLg}>
        <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>
          Projetos inclusos
        </Text>
        <SectionTable title="" columns={COLUNAS_PROJETOS} data={projects} />
      </View>

      {/* Informações Adicionais */}
      {!!informacoesAdicionais.length && (
        <View style={pdfStyles.mbLg}>
          <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>
            Informações Adicionais
          </Text>
          <InformacoesAdicionaisSection infos={informacoesAdicionais} />
        </View>
      )}

      {/* Condições de Pagamento */}
      {!!condicoesPagamento.length && (
        <View style={pdfStyles.mbLg}>
          <Text style={pdfStyles.boldBody}>Condições de pagamento</Text>
          <CondicoesPagamentoSection
            condicoesPagamentoData={condicoesPagamento}
          />
        </View>
      )}
    </PDFLayout>
  );
};

export default ModeloOrcamentoLayout;
