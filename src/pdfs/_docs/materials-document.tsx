import { Document, Text } from "@react-pdf/renderer";
import { DataGrid, DataGridCell, DataGridRow } from "../_components/data-grid";
import { DocumentTitle } from "../_components/document-title";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { Hr } from "../_components/hr";
import { PdfPageLayout } from "../_components/pdf-layout";
import { SectionTitle } from "../_components/section-title";
import { SummaryTotalRow } from "../_components/summary-total-row";
import { TitledTextSection } from "../_components/title-text-section";
import { getFormattedDateTime } from "../_utils/get-formatted-date-time";

export const MaterialsDocument = () => (
  <Document>
    <PdfPageLayout
      header={
        <Header
          variant="simple"
          docCode="C29115"
          dateTime={getFormattedDateTime()}
        />
      }
      footer={({ pageNumber, totalPages }) => (
        <Footer
          variant="default"
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      )}
    >
      <Hr />
      <DocumentTitle code="E29115" title="Relatório de materiais e custos" />
      <SectionTitle>Dados do cliente</SectionTitle>
      <DataGrid>
        <DataGridRow noBorderBottom>
          <DataGridCell width="70%">
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Nome: </Text>
              Cliente exemplo
            </Text>
          </DataGridCell>
          <DataGridCell width="30%" noBorderRight>
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Código: </Text>
              C38223
            </Text>
          </DataGridCell>
        </DataGridRow>
      </DataGrid>
      <SectionTitle>Projetos inclusos</SectionTitle>
      <DataGrid>
        <DataGridRow isHeader>
          <DataGridCell width="15%" align="center" isHeader>
            N°
          </DataGridCell>
          <DataGridCell width="70%" isHeader>
            Projeto
          </DataGridCell>
          <DataGridCell width="15%" align="center" isHeader noBorderRight>
            Qtde
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell width="15%" align="center">
            1
          </DataGridCell>
          <DataGridCell width="70%">Bancada de MDF</DataGridCell>
          <DataGridCell width="15%" align="center" noBorderRight>
            1
          </DataGridCell>
        </DataGridRow>
        <DataGridRow noBorderBottom>
          <DataGridCell width="15%" align="center">
            2
          </DataGridCell>
          <DataGridCell width="70%">Armários para cozinha</DataGridCell>
          <DataGridCell width="15%" align="center" noBorderRight>
            1
          </DataGridCell>
        </DataGridRow>
      </DataGrid>
      <SectionTitle>Materiais utilizados</SectionTitle>
      <DataGrid>
        <DataGridRow isHeader>
          <DataGridCell width="12%" isHeader>
            Cód.
          </DataGridCell>
          <DataGridCell flex={1} isHeader>
            Material
          </DataGridCell>
          <DataGridCell width="10%" align="center" isHeader>
            Qtde int
          </DataGridCell>
          <DataGridCell width="10%" align="center" isHeader>
            Qtde
          </DataGridCell>
          <DataGridCell width="10%" align="center" isHeader>
            Med.
          </DataGridCell>
          <DataGridCell width="15%" isHeader>
            Vlr. unitário
          </DataGridCell>
          <DataGridCell width="15%" isHeader noBorderRight>
            Total
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell width="12%">M27212</DataGridCell>
          <DataGridCell flex={1}>Dobradiça de pressão com pistão</DataGridCell>
          <DataGridCell width="10%" align="center">
            1
          </DataGridCell>
          <DataGridCell width="10%" align="center">
            1
          </DataGridCell>
          <DataGridCell width="10%" align="center">
            UN
          </DataGridCell>
          <DataGridCell width="15%">R$ 432,54</DataGridCell>
          <DataGridCell width="15%" noBorderRight>
            R$ 2.432,54
          </DataGridCell>
        </DataGridRow>
        <DataGridRow noBorderBottom>
          <DataGridCell width="12%">M82112</DataGridCell>
          <DataGridCell flex={1}>Chapa de MDF de alta qualidade</DataGridCell>
          <DataGridCell width="10%" align="center">
            4
          </DataGridCell>
          <DataGridCell width="10%" align="center">
            3.21
          </DataGridCell>
          <DataGridCell width="10%" align="center">
            M2
          </DataGridCell>
          <DataGridCell width="15%">R$ 262,24</DataGridCell>
          <DataGridCell width="15%" noBorderRight>
            R$ 1.552,04
          </DataGridCell>
        </DataGridRow>
      </DataGrid>
      <SummaryTotalRow label="Total:" value="R$ 2.132,54" />
      <SectionTitle>Equipe e outros custos</SectionTitle>
      <DataGrid>
        <DataGridRow isHeader>
          <DataGridCell width="15%" align="center" isHeader>
            N°
          </DataGridCell>
          <DataGridCell flex={1} isHeader>
            Equipe
          </DataGridCell>
          <DataGridCell width="15%" align="center" isHeader>
            Qtde
          </DataGridCell>
          <DataGridCell width="20%" isHeader>
            Valor
          </DataGridCell>
          <DataGridCell width="20%" isHeader noBorderRight>
            Total
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell width="15%" align="center">
            1
          </DataGridCell>
          <DataGridCell flex={1}>Montador de móveis</DataGridCell>
          <DataGridCell width="15%" align="center">
            4
          </DataGridCell>
          <DataGridCell width="20%">R$ 100,00</DataGridCell>
          <DataGridCell width="20%" noBorderRight>
            R$ 400,00
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell width="15%" align="center">
            2
          </DataGridCell>
          <DataGridCell flex={1}>Auxiliar de montagem</DataGridCell>
          <DataGridCell width="11%" align="center">
            2
          </DataGridCell>
          <DataGridCell width="20%">R$ 75,00</DataGridCell>
          <DataGridCell width="20%" noBorderRight>
            R$ 150,00
          </DataGridCell>
        </DataGridRow>
        <DataGridRow noBorderBottom>
          <DataGridCell width="15%" align="center">
            3
          </DataGridCell>
          <DataGridCell flex={1}>Frete e manuseio</DataGridCell>
          <DataGridCell width="15%" align="center">
            1
          </DataGridCell>
          <DataGridCell width="20%">R$ 150,00</DataGridCell>
          <DataGridCell width="20%" noBorderRight>
            R$ 150,00
          </DataGridCell>
        </DataGridRow>
      </DataGrid>
      <SummaryTotalRow label="Total:" value="R$ 700,00" />
      <TitledTextSection title="Observações e outros:">
        Realizar pedido de materiais com antecedência.
      </TitledTextSection>
    </PdfPageLayout>
  </Document>
);
