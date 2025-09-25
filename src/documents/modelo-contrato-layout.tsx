import type { ClientInput } from "@/modules/clients/schema/clients-schema";
import type { projectInput } from "@/modules/projects/schemas/project-schema";
import type { InformacoesAdicionais } from "@/modules/quotation/schemas/additional-info-schema ";
import type { EmpresaInfo } from "./types/simple-header";

import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Document, Page, Text, View } from "@react-pdf/renderer";

import { AssinaturasSection } from "./components/assinaturas-section";
import { ClausulasSection } from "./components/clausulas-section";
import { ClientesSection } from "./components/clients-section";
import { CondicoesPagamentoSection } from "./components/condicoes-pagamento-section";
import { ContratadaSection } from "./components/contratada-section";
import Footer from "./components/footer";
import Header from "./components/header";
import { InformacoesAdicionaisSection } from "./components/informacoes-adicionais-section";
import { ProjetosSection } from "./components/projects-section";

import type { CondicoesPagamento } from "@/modules/quotation/schemas/payment-conditions-schema";
import SectionTitleWithCode from "./components/tittle-section";
import { formatarDadosParaPDF } from "./utils/formatar-dados-pdf";

interface ModeloContratoProps {
  clients: ClientInput[];
  empresa: EmpresaInfo[];
  projects: projectInput[];
  informacoesAdicionais?: InformacoesAdicionais | InformacoesAdicionais[];
  condicoesPagamentoData?: CondicoesPagamento[];
  clientFields?: (keyof ClientInput)[];
  condicoesPagamentoFields?: (keyof CondicoesPagamento)[];
}

const clausulas = [
  "1) A CONTRATADA: Garante que seus móveis são confeccionados com material de primeira linha.",
  "1-1) Garante a reposição de qualquer item que apresentar defeito de fabricação no prazo máximo de 01 (um) ano da data de entrega do pedido, salvo se o mesmo estiver em falta no mercado ou fora de linha.",
  "1-2) Em caso de entrega do pedido no prazo estipulado, salvo comunicação prévia de atraso ao CONTRATANTE, e mediante aceite do mesmo, ou falta de condições de montagem por parte do CONTRATANTE, ficando a CONTRATADA isenta de qualquer tipo de multa.",
  "1-3) Assinará 02 (duas) vias de igual teor, ficando com 01 (uma) via.",
  "1-4) Não se incluem no seu pedido itens como puxadores, espelhos, peças em aço, vidros, e demais itens do campo 'MATERIAIS EXCLUSOS', salvo acordo prévio com o CONTRATANTE.",
  "2) A CONTRATANTE: Pagará pelos itens estipulados no pedido N.º 01.633, não podendo acrescentar mais itens após o fechamento do mesmo.",
  "2-1) Não poderão cancelar ou adiar pagamentos se a CONTRATADA estiver em dia nos prazos estipulados.",
  "2-2) Fornecerá planta elétrica e hidráulica (quando solicitado/a) pela CONTRATADA no período de instalações dos móveis.",
  "2-3) Assinará 02 (duas) vias de igual teor, ficando com 01 (uma) via.",
  "3) A CONTRATADA compromete-se a manter sigilo sobre quaisquer informações fornecidas pelo CONTRATANTE.",
  "4) Qualquer divergência ou conflito referente a este contrato será solucionado via negociação entre as partes, e em último caso, de acordo com a legislação vigente.",
  "5) Este contrato entra em vigor na data da assinatura e tem validade até a completa execução dos serviços contratados.",
];

export const ModeloContratoLayout = ({
  clients,
  empresa,
  projects,
  informacoesAdicionais,
  condicoesPagamentoData,
  clientFields,
  condicoesPagamentoFields,
}: ModeloContratoProps) => {
  const {
    empresaData,
    contratanteData,
    projetosDados,
    clientesLinhas,
    condicoesPagamentoLinhas,
  } = formatarDadosParaPDF({
    clients,
    empresa,
    projects,
    clientFields,
    condicoesPagamento: condicoesPagamentoData,
    condicoesPagamentoFields,
  });

  const infosArray = Array.isArray(informacoesAdicionais)
    ? informacoesAdicionais
    : informacoesAdicionais
      ? [informacoesAdicionais]
      : [];

  return (
    <Document>
      {/* Página 1: Dados, projetos e informações gerais */}
      <Page size="A4" style={pdfStyles.page} wrap>
        <Header data={empresa[0]} />

        <SectionTitleWithCode code="V29115" title="Contrato de venda" />

        {/* Contratada */}
        <View style={pdfStyles.mbLg}>
          <Text style={pdfStyles.boldBody}>Dados da Contratada</Text>
          <ContratadaSection empresaData={empresaData} />
        </View>

        {/* Clientes */}
        <View style={pdfStyles.mbLg}>
          <Text style={pdfStyles.boldBody}>Dados da contratante</Text>
          <ClientesSection clientesLinhas={clientesLinhas} />
        </View>

        {/* Projetos */}
        <View style={pdfStyles.mbLg}>
          <Text style={[pdfStyles.boldBody]}>Projetos</Text>
          <ProjetosSection projetosDados={projetosDados} />
        </View>

        {/* Informações Adicionais */}
        <View style={pdfStyles.mbLg}>
          <Text style={[pdfStyles.boldBody, pdfStyles.mbLg]}>
            Informações Adicionais
          </Text>
          <InformacoesAdicionaisSection infos={infosArray} />
        </View>

        {/* Condições de Pagamento */}
        <View style={pdfStyles.mbLg}>
          <Text style={pdfStyles.boldBody}>Condições de Pagamento</Text>
          <CondicoesPagamentoSection
            condicoesPagamentoData={condicoesPagamentoLinhas}
          />
        </View>

        {/* Footer da página */}
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

      {/* Página 2: Cláusulas e Assinaturas */}
      <Page size="A4" style={pdfStyles.page} wrap>
        {/* Cláusulas */}
        <View style={pdfStyles.mbLg}>
          <Text style={pdfStyles.boldBody}>Cláusulas</Text>
          <ClausulasSection clausulas={clausulas} />
        </View>

        {/* Assinaturas */}
        <View style={pdfStyles.mbLg}>
          <Text style={pdfStyles.boldBody}>Assinaturas</Text>
          <AssinaturasSection />
        </View>

        {/* Footer da página */}
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

export default ModeloContratoLayout;
