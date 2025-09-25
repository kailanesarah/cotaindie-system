import type { ClientInput } from "@/modules/clients/schema/clients-schema";
import type { costInput } from "@/modules/costs/schemas/costs-schemas";
import type { ProductInput } from "@/modules/products/schema/products-schema";
import type { projectInput } from "@/modules/projects/schemas/project-schema";
import type { InformacoesAdicionais } from "@/modules/quotation/schemas/additional-info-schema ";
import type { EmpresaInfo } from "./types/simple-header";

import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Document, Page, Text, View } from "@react-pdf/renderer";

import { ClientesSection } from "./components/clients-section";
import { CustosSection } from "./components/costs-section";
import Footer from "./components/footer";
import Header from "./components/header";
import { InformacoesAdicionaisSection } from "./components/informacoes-adicionais-section";
import { MateriaisSection } from "./components/materials-section";
import { ProjetosSection } from "./components/projects-section";

import SectionTitleWithCode from "./components/tittle-section";
import { formatarDadosParaPDF } from "./utils/formatar-dados-pdf";

interface EspelhoMateriaisProps {
  clients: ClientInput[];
  empresa: EmpresaInfo[];
  costs: costInput[];
  products: ProductInput[];
  projects: projectInput[];
  informacoesAdicionais?: InformacoesAdicionais | InformacoesAdicionais[];
  clientFields?: (keyof ClientInput)[];
}

export default function EspelhoMateriaisLayout({
  clients,
  empresa,
  costs,
  products,
  projects,
  informacoesAdicionais,
  clientFields,
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
    condicoesPagamento: [],
    empresa,
    clientFields,
  });

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page} wrap>
        <Header data={empresa[0]} />

        <SectionTitleWithCode
          code="E29115"
          title="Relatório de clientes, materiais e projetos"
        />

        {/* Clientes */}
        <View style={pdfStyles.mbLg}>
          <Text style={pdfStyles.boldBody}>Cliente</Text>
          <ClientesSection clientesLinhas={clientesLinhas} />
        </View>

        {/* Projetos */}
        <View style={pdfStyles.mtLg}>
          <Text style={pdfStyles.boldBody}>Projetos</Text>
          <ProjetosSection projetosDados={projetosDados} />
        </View>

        {/* Materiais */}
        <View style={pdfStyles.mtLg}>
          <Text style={pdfStyles.boldBody}>Materiais</Text>
          <MateriaisSection
            materiaisDados={materiaisDados}
            totalMateriais={totalMateriais}
          />
        </View>

        {/* Custos */}
        <View style={pdfStyles.mtLg}>
          <Text style={pdfStyles.boldBody}>Custos</Text>
          <CustosSection custosDados={custosDados} totalCustos={totalCustos} />
        </View>

        {/* Informações Adicionais */}
        <View style={pdfStyles.mtLg}>
          <Text style={[pdfStyles.h3, pdfStyles.mtLg]}>
            Informações Adicionais
          </Text>
          <InformacoesAdicionaisSection infos={infosAdicionais} />
        </View>

        {/* Footer e paginação */}
        <View style={pdfStyles.footerContainer} fixed>
          <Footer />
          <View style={pdfStyles.pageNumberContainer}>
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
