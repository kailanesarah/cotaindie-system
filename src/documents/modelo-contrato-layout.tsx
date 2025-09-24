// ===== Imports de tipos =====
import type { ClientInput } from "@/modules/clients/schema/clients-schema";
import type { projectInput } from "@/modules/projects/schemas/project-schema";
import type { InformacoesAdicionais } from "./types/infos-adicionais";
import type { EmpresaInfo } from "./types/simple-header";

// ===== Imports de estilos e PDF renderer =====
import { pagePadding, pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Document, Page, Text, View } from "@react-pdf/renderer";

// ===== Imports de componentes =====
import Footer from "./components/footer";
import Header from "./components/header";
import PrimaryTable from "./components/primary-table";
import { SectionTable } from "./components/section-table";

// ===== Imports de utilitários e constantes =====
import { colors } from "@/styles/pdf_styles/pdfColors";
import { COLUNAS_PROJETOS } from "./constants/pdfColumns";
import { formatarDadosParaPDF } from "./utils/formatar-dados-pdf";
import { objetoParaTabela } from "./utils/objetoParaTabela";

interface ModeloContratoProps {
  clients: ClientInput[];
  empresa: EmpresaInfo[];
  projects: projectInput[];
  informacoesAdicionais?: InformacoesAdicionais | InformacoesAdicionais[];
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
];

const condicoesPagamento = {
  "Plano de pagamento": "A combinar",
  Adiantamento: "R$ 432,54",
  "Data da venda": "30/05/2025",
  "Pagamento do restante": "A combinar",
  "Previsão de entrega": "45 dias úteis após a data da venda",
  Restante: "1 X de R$ 805,60 = R$ 805,60",
};

const ModeloContratoLayout = ({
  clients,
  empresa,
  projects,
  informacoesAdicionais,
}: ModeloContratoProps) => {
  const { empresaData, contratanteData, projetosDados } = formatarDadosParaPDF({
    empresa,
    clients,
    projects,
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

        {/* Título */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: pagePadding.paddingTop,
          }}
        >
          <Text style={{ ...pdfStyles.h3, color: colors.redDarker }}>
            E29115 -{" "}
          </Text>
          <Text style={pdfStyles.h3}>
            Relatório de clientes, materiais e projetos
          </Text>
        </View>

        <View style={{ flexDirection: "column", flexGrow: 1 }}>
          {/* Seção: Dados da Contratada */}
          <View style={pdfStyles.mbLg}>
            <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>
              Dados da Contratada
            </Text>
            <PrimaryTable items={empresaData} />
          </View>

          {/* Seção: Dados do Contratante */}
          <View style={pdfStyles.mbLg}>
            <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>
              Dados da Contratante (Cliente)
            </Text>
            <PrimaryTable items={contratanteData} />
          </View>

          {/* Seção: Projetos */}
          <View style={pdfStyles.mbLg}>
            <SectionTable
              title="Projetos"
              columns={COLUNAS_PROJETOS}
              data={projetosDados}
            />
          </View>

          {/* Informações adicionais */}
          {infosArray.map((info, idx) => (
            <View key={idx}>
              {info.materiaisInclusos && (
                <View style={pdfStyles.mbLg}>
                  <Text style={pdfStyles.boldBody}>Materiais inclusos:</Text>
                  <Text style={pdfStyles.tableCell}>
                    {info.materiaisInclusos}
                  </Text>
                </View>
              )}
              {info.materiaisExclusos && (
                <View style={pdfStyles.mbLg}>
                  <Text style={pdfStyles.boldBody}>Materiais exclusivos:</Text>
                  <Text style={pdfStyles.tableCell}>
                    {info.materiaisExclusos}
                  </Text>
                </View>
              )}
              {info.observacoes && (
                <View style={pdfStyles.mbLg}>
                  <Text style={pdfStyles.boldBody}>Observações e outros:</Text>
                  <Text style={pdfStyles.tableCell}>{info.observacoes}</Text>
                </View>
              )}
            </View>
          ))}

          {/* Condições de pagamento */}
          <View style={pdfStyles.mbLg}>
            <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>
              Condições de pagamento
            </Text>
            <PrimaryTable items={objetoParaTabela(condicoesPagamento, 2)} />
          </View>

          {/* Cláusulas contratuais */}
          <View wrap={false} style={pdfStyles.mbLg}>
            <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>
              Cláusulas contratuais
            </Text>
            {clausulas.map((clausula, idx) => (
              <Text
                key={idx}
                style={[
                  pdfStyles.body,
                  { textAlign: "justify", lineHeight: 1.4, marginBottom: 4 },
                ]}
              >
                {clausula}
              </Text>
            ))}
          </View>

          {/* Assinaturas */}
          <View style={pdfStyles.mtXl}>
            <Text
              style={[pdfStyles.body, { textAlign: "right", marginBottom: 40 }]}
            >
              Viçosa do Ceará, 01 de agosto de 2025
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 40,
              }}
            >
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text>_________________________________</Text>
                <Text style={{ marginTop: 4 }}>CONTRATADA</Text>
                <Text style={{ marginTop: 4 }}>Paulo César Arruda Aragão</Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text>_________________________________</Text>
                <Text style={{ marginTop: 4 }}>CONTRATANTE</Text>
                <Text style={{ marginTop: 4 }}>Cliente exemplo</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer e paginação */}
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
