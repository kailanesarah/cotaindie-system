// ===== Imports de tipos =====
import type { ClientInput } from "@/modules/clients/schema/clients-schema";
import type { projectInput } from "@/modules/projects/schemas/project-schema";
import type { InformacoesAdicionais } from "./types/infos-adicionais";
import type { EmpresaInfo } from "./types/simple-header";

// ===== Imports de estilos e PDF renderer =====
import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Document, Page, Text, View } from "@react-pdf/renderer";

// ===== Imports de componentes =====
import Footer from "./components/footer";
import Header from "./components/header";
import PrimaryTable from "./components/primary-table";
import { SectionTable } from "./components/section-table";

// ===== Imports de utilitários e constantes =====
import { COLUNAS_PROJETOS } from "./constants/pdfColumns";
import { formatarDadosParaPDF } from "./utils/formatar-dados-pdf";
import { objetoParaTabela } from "./utils/objetoParaTabela";

interface ModeloOrcamentoProps {
  clients: ClientInput[];
  empresa: EmpresaInfo[];
  projects: projectInput[];
  informacoesAdicionais?: InformacoesAdicionais | InformacoesAdicionais[];
}

const condicoesPagamentoPadrao = {
  "Plano de pagamento": "A combinar",
  Adiantamento: "R$ 432,54",
  "Data da venda": "30/05/2025",
  "Pagamento do restante": "A combinar",
  "Previsão de entrega": "45 dias úteis após a data da venda",
  Restante: "1 X de R$ 805,60 = 805,60",
};

const ModeloOrcamentoLayout = ({
  clients,
  empresa,
  projects,
  informacoesAdicionais,
}: ModeloOrcamentoProps) => {
  const { clientesLinhas, projetosDados } = formatarDadosParaPDF({
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

        <View style={{ flexDirection: "column", flexGrow: 1 }}>
          {/* Seção: Dados do Cliente */}
          <View style={pdfStyles.mbLg}>
            <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>
              Dados da Contratante (Cliente)
            </Text>
            <PrimaryTable items={clientesLinhas} />
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
              {/* Valores do pedido */}
              {(info.valorPedido ||
                info.descontoPercentual !== undefined ||
                info.valorDesconto ||
                info.valorAPagar) && (
                <View style={pdfStyles.mbLg}>
                  {info.valorPedido && (
                    <Text style={pdfStyles.tableCell}>
                      Valor do pedido: {info.valorPedido}
                    </Text>
                  )}
                  {info.descontoPercentual !== undefined && (
                    <Text style={pdfStyles.tableCell}>
                      Desconto de: {info.descontoPercentual}%
                    </Text>
                  )}
                  {info.valorDesconto && (
                    <Text style={pdfStyles.tableCell}>
                      Valor do desconto: {info.valorDesconto}
                    </Text>
                  )}
                  {info.valorAPagar && (
                    <Text style={[pdfStyles.boldBody, pdfStyles.mtSm]}>
                      Valor a pagar: {info.valorAPagar}
                    </Text>
                  )}
                </View>
              )}

              {/* Materiais inclusos */}
              {info.materiaisInclusos && (
                <View style={pdfStyles.mbLg}>
                  <Text style={pdfStyles.boldBody}>Materiais inclusos:</Text>
                  <Text style={pdfStyles.tableCell}>
                    {info.materiaisInclusos}
                  </Text>
                </View>
              )}

              {/* Materiais exclusivos */}
              {info.materiaisExclusos && (
                <View style={pdfStyles.mbLg}>
                  <Text style={pdfStyles.boldBody}>Materiais exclusivos:</Text>
                  <Text style={pdfStyles.tableCell}>
                    {info.materiaisExclusos}
                  </Text>
                </View>
              )}

              {/* Condições de pagamento */}
              <View style={pdfStyles.mbLg}>
                <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>
                  Condições de pagamento
                </Text>
                <PrimaryTable
                  items={objetoParaTabela(condicoesPagamentoPadrao, 2)}
                />
              </View>

              {/* Observações */}
              {info.observacoes && (
                <View style={pdfStyles.mbLg}>
                  <Text style={pdfStyles.boldBody}>Observações e outros:</Text>
                  <Text style={pdfStyles.tableCell}>{info.observacoes}</Text>
                </View>
              )}
            </View>
          ))}
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

export default ModeloOrcamentoLayout;
