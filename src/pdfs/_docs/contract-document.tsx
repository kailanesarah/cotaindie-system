import { Document, Text } from "@react-pdf/renderer";
import { ClausesBlock } from "../_components/clauses-block";
import { DataGrid, DataGridCell, DataGridRow } from "../_components/data-grid";
import { DocumentTitle } from "../_components/document-title";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { Hr } from "../_components/hr";
import { PdfPageLayout } from "../_components/pdf-layout";
import { SectionTitle } from "../_components/section-title";
import { SignatureBlock } from "../_components/signature-block";
import { SummaryBlock } from "../_components/summary-block";
import { TitledTextSection } from "../_components/title-text-section";
import { contractClauses } from "../_constants/mock-data";
import { getFormattedDateTime } from "../_utils/get-formatted-date-time";

export const ContractDocument = () => (
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
      <DocumentTitle code="V29115" title="Contrato de venda" />
      <SectionTitle>Dados da contratada</SectionTitle>
      <DataGrid>
        <DataGridRow>
          <DataGridCell noBorderRight>
            <Text>
              <Text style={{ fontWeight: 700 }}>Nome: </Text>Paulo César Arruda
              Aragão
            </Text>
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell width="35%">
            <Text>
              <Text style={{ fontWeight: 700 }}>Cidade: </Text>
              Viçosa do Ceará
            </Text>
          </DataGridCell>
          <DataGridCell width="30%">
            <Text>
              <Text style={{ fontWeight: 700 }}>Cep: </Text>
              62300000
            </Text>
          </DataGridCell>
          <DataGridCell width="35%" noBorderRight>
            <Text>
              <Text style={{ fontWeight: 700 }}>Bairro: </Text>Zona Rural
            </Text>
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell width="35%">
            <Text>
              <Text style={{ fontWeight: 700 }}>Número: </Text>SN
            </Text>
          </DataGridCell>
          <DataGridCell width="65%" noBorderRight>
            <Text>
              <Text style={{ fontWeight: 700 }}>Endereço: </Text>
              Sítio São Paulo
            </Text>
          </DataGridCell>
        </DataGridRow>
        <DataGridRow noBorderBottom>
          <DataGridCell width="35%">
            <Text>
              <Text style={{ fontWeight: 700 }}>CPF/ CNPJ: </Text>
              23.933.978/0001-07
            </Text>
          </DataGridCell>
          <DataGridCell width="30%">
            <Text>
              <Text style={{ fontWeight: 700 }}>Telefone: </Text>
              (88) 9 781 - 5906
            </Text>
          </DataGridCell>
          <DataGridCell width="35%" noBorderRight>
            <Text>
              <Text style={{ fontWeight: 700 }}>Email: </Text>
              oi@gmail.com
            </Text>
          </DataGridCell>
        </DataGridRow>
      </DataGrid>
      <SectionTitle>Dados da contratante **(cliente)</SectionTitle>
      <DataGrid>
        <DataGridRow>
          <DataGridCell width="65%">
            <Text>
              <Text style={{ fontWeight: 700 }}>Nome: </Text>Maria Ivani
            </Text>
          </DataGridCell>
          <DataGridCell width="35%" noBorderRight>
            <Text>
              <Text style={{ fontWeight: 700 }}>Código: </Text>
              C38223
            </Text>
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell width="35%">
            <Text>
              <Text style={{ fontWeight: 700 }}>Cidade: </Text>
              Tianguá
            </Text>
          </DataGridCell>
          <DataGridCell width="30%">
            <Text>
              <Text style={{ fontWeight: 700 }}>Cep: </Text>
              62520000
            </Text>
          </DataGridCell>
          <DataGridCell width="35%" noBorderRight>
            <Text>
              <Text style={{ fontWeight: 700 }}>Bairro: </Text>
              Centro
            </Text>
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell width="35%">
            <Text>
              <Text style={{ fontWeight: 700 }}>Número: </Text>221
            </Text>
          </DataGridCell>
          <DataGridCell width="65%" noBorderRight>
            <Text>
              <Text style={{ fontWeight: 700 }}>Endereço: </Text>
              Rua do Estádio
            </Text>
          </DataGridCell>
        </DataGridRow>
        <DataGridRow noBorderBottom>
          <DataGridCell width="35%">
            <Text>
              <Text style={{ fontWeight: 700 }}>CPF/ CNPJ: </Text>
              075.322.111-32
            </Text>
          </DataGridCell>
          <DataGridCell width="30%">
            <Text>
              <Text style={{ fontWeight: 700 }}>Telefone: </Text>
              (88) 9 9921 - 3234
            </Text>
          </DataGridCell>
          <DataGridCell width="35%" noBorderRight>
            <Text>
              <Text style={{ fontWeight: 700 }}>Email: </Text>
              maria@gmail.com
            </Text>
          </DataGridCell>
        </DataGridRow>
      </DataGrid>
      <SectionTitle>Dados do projeto</SectionTitle>
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
        totalValue="R$ 2.132,54"
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
          <DataGridCell width="60%">
            <Text>
              <Text style={{ fontWeight: 700 }}>Plano de pagamento: </Text>A
              combinar
            </Text>
          </DataGridCell>
          <DataGridCell width="40%" noBorderRight>
            <Text>
              <Text style={{ fontWeight: 700 }}>Adiantamento: </Text>
              R$ 432,54
            </Text>
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell width="60%">
            <Text>
              <Text style={{ fontWeight: 700 }}>Data da venda: </Text>
              30/05/2025
            </Text>
          </DataGridCell>
          <DataGridCell width="40%" noBorderRight>
            <Text>
              <Text style={{ fontWeight: 700 }}>Pagamento do restante: </Text>A
              combinar
            </Text>
          </DataGridCell>
        </DataGridRow>
        <DataGridRow noBorderBottom>
          <DataGridCell width="60%">
            <Text>
              <Text style={{ fontWeight: 700 }}>Previsão de entrega: </Text>
              45 dias úteis após a data da venda
            </Text>
          </DataGridCell>
          <DataGridCell width="40%" noBorderRight>
            <Text>
              <Text style={{ fontWeight: 700 }}>Restante: </Text>1 X de R$
              805,60 = 805,60
            </Text>
          </DataGridCell>
        </DataGridRow>
      </DataGrid>
    </PdfPageLayout>
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
      <ClausesBlock title="Cláusulas Contratuais" items={contractClauses} />
      <SignatureBlock
        date="Viçosa do Ceará, 01 de agosto de 2025"
        partyA="Paulo César Arruda Aragão"
        partyB="Cliente exemplo"
      />
    </PdfPageLayout>
  </Document>
);
