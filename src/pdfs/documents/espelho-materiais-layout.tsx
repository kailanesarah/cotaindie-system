import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Text, View } from "@react-pdf/renderer";
import { ClientesSection } from "../components/clients-section";
import { CustosSection } from "../components/costs-section";
import { InformacoesAdicionaisSection } from "../components/informacoes-adicionais-section";
import { MateriaisSection } from "../components/materials-section";
import { ProjetosSection } from "../components/projects-section";
import SectionTitleWithCode from "../components/tittle-section";
import PDFLayout from "../PDFLayout";
import { getPDFDataFromStore } from "../utils/getPDFDataFromStore";

function EspelhoMateriais() {
  const { empresa, clients, projects, products, costs, informacoesAdicionais } =
    getPDFDataFromStore();

  return (
    <PDFLayout empresa={empresa}>
      <SectionTitleWithCode
        code="E29115"
        title="Relatório de clientes, materiais e projetos"
      />

      {!!clients.length && (
        <View style={pdfStyles.mbLg}>
          <Text style={pdfStyles.boldBody}>Clientes</Text>
          <ClientesSection clientesLinhas={clients} />
        </View>
      )}

      {!!projects.length && (
        <View style={pdfStyles.mtLg}>
          <Text style={pdfStyles.boldBody}>Projetos</Text>
          <ProjetosSection projetosDados={projects} />
        </View>
      )}

      {!!products.length && (
        <View style={pdfStyles.mtLg}>
          <Text style={pdfStyles.boldBody}>Materiais</Text>
          <MateriaisSection materiaisDados={products} />
        </View>
      )}

      {!!costs.length && (
        <View style={pdfStyles.mtLg}>
          <Text style={pdfStyles.boldBody}>Custos</Text>
          <CustosSection custosDados={costs} />
        </View>
      )}

      {!!informacoesAdicionais.length && (
        <View style={pdfStyles.mtLg}>
          <Text style={pdfStyles.h3}>Informações Adicionais</Text>
          <InformacoesAdicionaisSection infos={informacoesAdicionais} />
        </View>
      )}
    </PDFLayout>
  );
}

export default EspelhoMateriais;
