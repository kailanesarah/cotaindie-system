import { Document, Text } from "@react-pdf/renderer";
import { DataGrid, DataGridCell, DataGridRow } from "../_components/data-grid";
import { DocumentTitle } from "../_components/document-title";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { Hr } from "../_components/hr";
import { PdfPageLayout } from "../_components/pdf-layout";
import { SectionTitle } from "../_components/section-title";
import { SummaryBlock } from "../_components/summary-block";
import { TitledTextSection } from "../_components/title-text-section";
import { quoteCompanyInfo } from "../_constants/mock-data";
import { getFormattedDateTime } from "../_utils/get-formatted-date-time";

export const QuoteDocument = () => (
  <Document>
    <PdfPageLayout
      header={
        <Header
          variant="detailed"
          companyInfo={quoteCompanyInfo}
          dateTime={getFormattedDateTime()}
        />
      }
      footer={({ pageNumber, totalPages }) => (
        <Footer
          variant="quote"
          pageNumber={pageNumber}
          totalPages={totalPages}
        />
      )}
    >
      <Hr />
      <DocumentTitle code="C29115" title="Orçamento de projeto" />
      <SectionTitle>Dados do cliente</SectionTitle>
      <DataGrid>
        <DataGridRow>
          <DataGridCell width="60%">
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Nome: </Text>
              Antônio José
            </Text>
          </DataGridCell>
          <DataGridCell width="40%" noBorderRight>
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Código: </Text>
              C38223
            </Text>
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell width="35%">
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Cidade: </Text>
              Viçosa do Ceará
            </Text>
          </DataGridCell>
          <DataGridCell width="25%">
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Cep: </Text>
              62300000
            </Text>
          </DataGridCell>
          <DataGridCell width="40%" noBorderRight>
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Bairro: </Text>
              Centro
            </Text>
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell width="35%">
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Número: </Text>SN
            </Text>
          </DataGridCell>
          <DataGridCell width="65%" noBorderRight>
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Endereço: </Text>
              Rua Dr Júlio de Carvalho
            </Text>
          </DataGridCell>
        </DataGridRow>
        <DataGridRow noBorderBottom>
          <DataGridCell width="35%">
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>CPF/ CNPJ: </Text>
              075.322.111-32
            </Text>
          </DataGridCell>
          <DataGridCell width="25%">
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Telefone: </Text>
              (88) 9 9332 - 6040
            </Text>
          </DataGridCell>
          <DataGridCell width="40%" noBorderRight>
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Email: </Text>
              oi@gmail.com
            </Text>
          </DataGridCell>
        </DataGridRow>
      </DataGrid>
      <SectionTitle>Projetos inclusos</SectionTitle>
      <DataGrid>
        <DataGridRow isHeader>
          <DataGridCell width="10%" align="center" isHeader>
            N°
          </DataGridCell>
          <DataGridCell width="50%" isHeader>
            Projeto
          </DataGridCell>
          <DataGridCell width="10%" align="center" isHeader>
            Qtde
          </DataGridCell>
          <DataGridCell width="15%" isHeader>
            Valor unitário
          </DataGridCell>
          <DataGridCell width="15%" isHeader noBorderRight>
            Valor total
          </DataGridCell>
        </DataGridRow>
        <DataGridRow noBorderBottom>
          <DataGridCell width="10%" align="center">
            1
          </DataGridCell>
          <DataGridCell width="50%">Bancada de MDF</DataGridCell>
          <DataGridCell width="10%" align="center">
            1
          </DataGridCell>
          <DataGridCell width="15%">R$ 2.432,54</DataGridCell>
          <DataGridCell width="15%" noBorderRight>
            R$ 2.432,54
          </DataGridCell>
        </DataGridRow>
      </DataGrid>
      <SummaryBlock
        discountLabel="Desconto de: 10%"
        orderValue="R$ 2.432,54"
        discountValue="R$ -432,54"
        totalValue="R$ 1.832,54"
      />
      <TitledTextSection title="Materiais inclusos:">
        Estrutura confeccionada em MDF de alta qualidade, garantindo
        durabilidade e bom acabamento.
      </TitledTextSection>
      <TitledTextSection title="Materiais exclusos:">
        Espelhos, independentemente do tamanho ou espessura.
      </TitledTextSection>
      <SectionTitle>Condições de pagamento</SectionTitle>
      <DataGrid>
        <DataGridRow>
          <DataGridCell width="50%">
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                Plano de pagamento:{" "}
              </Text>
              A combinar
            </Text>
          </DataGridCell>
          <DataGridCell width="50%" noBorderRight>
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                Adiantamento:{" "}
              </Text>
              R$ 432,54
            </Text>
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell width="50%">
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                Data da venda:{" "}
              </Text>
              30/05/2025
            </Text>
          </DataGridCell>
          <DataGridCell width="50%" noBorderRight>
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                Pagamento do restante:{" "}
              </Text>
              A combinar
            </Text>
          </DataGridCell>
        </DataGridRow>
        <DataGridRow noBorderBottom>
          <DataGridCell width="50%">
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                Previsão de entrega:{" "}
              </Text>
              45 dias úteis após a data da venda
            </Text>
          </DataGridCell>
          <DataGridCell width="50%" noBorderRight>
            <Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Restante: </Text>1
              X de R$ 805,60 = 805,60
            </Text>
          </DataGridCell>
        </DataGridRow>
      </DataGrid>
      <TitledTextSection title="Observações e outros:">
        A entrega deve ser feita durante o dia e com cuidado na instalação.
      </TitledTextSection>
    </PdfPageLayout>
  </Document>
);
