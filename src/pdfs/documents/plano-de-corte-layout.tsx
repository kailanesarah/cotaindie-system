import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Image, Text, View } from "@react-pdf/renderer";
import { ClientesSection } from "../components/clients-section";
import { InformacoesAdicionaisSection } from "../components/informacoes-adicionais-section";
import { MateriaisSection } from "../components/materials-section";
import { ProjetosSection } from "../components/projects-section";
import SectionTitleWithCode from "../components/tittle-section";
import PDFLayout from "../PDFLayout";
import { getPDFDataFromStore } from "../utils/getPDFDataFromStore";

interface PlanoDeCorteLayoutProps {
  cutPlanURL: string;
}

export const PlanoDeCorteLayout = ({ cutPlanURL }: PlanoDeCorteLayoutProps) => {
  const { empresa, clients, projects, pieces, informacoesAdicionais } =
    getPDFDataFromStore();

  return (
    <PDFLayout empresa={empresa}>
      <SectionTitleWithCode code="P29115" title="Plano de Corte e Materiais" />

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

      {!!pieces.length && (
        <View style={pdfStyles.mtLg}>
          <Text style={pdfStyles.boldBody}>Materiais</Text>
          <MateriaisSection materiaisDados={pieces} />
        </View>
      )}

      {!!cutPlanURL && (
        <View style={pdfStyles.mtLg}>
          <Text style={pdfStyles.boldBody}>Plano de Corte</Text>
          <View style={pdfStyles.cutPlanContainer}>
            <Text style={pdfStyles.cutPlanLabel}>Imagem do Plano de Corte</Text>
            <Image src={cutPlanURL} style={pdfStyles.cutPlanImage} />
          </View>
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
};

export default PlanoDeCorteLayout;
