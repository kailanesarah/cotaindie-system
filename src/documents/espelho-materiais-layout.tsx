import type { ClientInput } from "@/modules/clients/schema/clients-schema";
import type { costInput } from "@/modules/costs/schemas/costs-schemas";
import type { ProductInput } from "@/modules/products/schema/products-schema";
import type { projectInput } from "@/modules/projects/schemas/project-schema";
import type { InformacoesAdicionais } from "./types/infos-adicionais";
import type { EmpresaInfo } from "./types/simple-header";

import { colors } from "@/styles/pdf_styles/pdfColors";
import { pagePadding, pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Document, Page, Text, View } from "@react-pdf/renderer";

import Footer from "./components/footer";
import Header from "./components/header";
import Table from "./components/primary-table";
import { SectionTable } from "./components/section-table";
import {
  COLUNAS_CUSTOS,
  COLUNAS_MATERIAIS,
  COLUNAS_PROJETOS,
} from "./constants/pdfColumns";
import { formatarDadosParaPDF } from "./utils/formatar-dados-pdf";

interface EspelhoMateriaisProps {
  clients: ClientInput[];
  empresa: EmpresaInfo[];
  costs: costInput[];
  products: ProductInput[];
  projects: projectInput[];
  informacoesAdicionais?: InformacoesAdicionais | InformacoesAdicionais[];
}

export default function EspelhoMateriaisLayout({
  clients,
  empresa,
  costs,
  products,
  projects,
  informacoesAdicionais,
}: EspelhoMateriaisProps) {
  const {
    clientesLinhas,
    materiaisDados,
    projetosDados,
    custosDados,
    totalMateriais,
    totalCustos,
    infosAdicionais,
  } = formatarDadosParaPDF({
    clients,
    products,
    projects,
    costs,
    infos: Array.isArray(informacoesAdicionais)
      ? informacoesAdicionais
      : informacoesAdicionais
        ? [informacoesAdicionais]
        : [],
    empresa,
  });

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page} wrap>
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
          {/* Seção: Clientes */}
          <View style={pdfStyles.mbLg}>
            <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>Clientes</Text>
            <Table items={clientesLinhas} />
          </View>

          {/* Seção: Projetos */}
          <View style={pdfStyles.mbLg}>
            <SectionTable
              title="Projetos"
              columns={COLUNAS_PROJETOS}
              data={projetosDados}
            />
          </View>

          {/* Seção: Materiais */}
          <View style={pdfStyles.mbLg}>
            <SectionTable
              title="Materiais"
              columns={COLUNAS_MATERIAIS}
              data={materiaisDados}
              total={totalMateriais}
            />
          </View>

          {/* Seção: Custos */}
          <View style={pdfStyles.mbLg}>
            <SectionTable
              title="Custos"
              columns={COLUNAS_CUSTOS}
              data={custosDados}
              total={totalCustos}
            />
          </View>

          {/* Informações adicionais */}
          {infosAdicionais.length > 0 && (
            <View style={pdfStyles.mbLg}>
              <Text style={[pdfStyles.boldBody, pdfStyles.mbSm]}>
                Informações adicionais
              </Text>
              {infosAdicionais.map((info, index) =>
                info.observacoes ? (
                  <Text key={index} style={pdfStyles.boldSmall}>
                    {info.observacoes}
                  </Text>
                ) : null,
              )}
            </View>
          )}
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
}
