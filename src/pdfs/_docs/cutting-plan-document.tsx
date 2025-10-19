import { Document, Image, Text, View } from "@react-pdf/renderer";
import { DataGrid, DataGridCell, DataGridRow } from "../_components/data-grid";
import { DocumentTitle } from "../_components/document-title";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { Hr } from "../_components/hr";
import { PdfPageLayout } from "../_components/pdf-layout";
import { SectionTitle } from "../_components/section-title";
import { TitledTextSection } from "../_components/title-text-section";
import { getFormattedDateTime } from "../_utils/get-formatted-date-time";

export const CuttingPlanDocument = () => (
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
      <DocumentTitle code="P29115" title="Plano de corte" />
      <SectionTitle>Dados do cliente</SectionTitle>
      <DataGrid>
        <DataGridRow noBorderBottom>
          <DataGridCell width="70%">
            <Text>
              <Text style={{ fontWeight: 700 }}>Nome: </Text>
              Cliente exemplo
            </Text>
          </DataGridCell>
          <DataGridCell width="30%" noBorderRight>
            <Text>
              <Text style={{ fontWeight: 700 }}>Código: </Text>
              C38223
            </Text>
          </DataGridCell>
        </DataGridRow>
      </DataGrid>
      <SectionTitle>
        Projeto 01 - Móveis da cozinha (quantidade - 2)
      </SectionTitle>
      <DataGrid>
        <DataGridRow>
          <DataGridCell width="10%" align="center" isHeader>
            N°
          </DataGridCell>
          <DataGridCell flex={1} isHeader>
            Materiais e peças
          </DataGridCell>
          <DataGridCell width="15%" align="center" isHeader noBorderRight>
            Qtde
          </DataGridCell>
        </DataGridRow>
        <DataGridRow isHeader style={{ backgroundColor: "#f0f0f0" }}>
          <DataGridCell width="10%" align="center">
            1
          </DataGridCell>
          <DataGridCell style={{ fontWeight: 700 }} flex={1}>
            MDF Branco 18MM - M28321
          </DataGridCell>
          <DataGridCell style={{ fontWeight: 700 }} flex={1}>
            Corte: Horizontal e vertical
          </DataGridCell>
          <DataGridCell width="15%" align="center" noBorderRight>
            <></>
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell width="10%" align="center">
            1.1
          </DataGridCell>
          <DataGridCell flex={1}>
            - Porta de correr ( Altura: 32cm, Largura 25cm)
          </DataGridCell>
          <DataGridCell width="15%" align="center" noBorderRight>
            2
          </DataGridCell>
        </DataGridRow>
        <DataGridRow>
          <DataGridCell width="10%" align="center">
            1.2
          </DataGridCell>
          <DataGridCell flex={1}>
            - Prateleira simples (MDF Beige - Altura: 32cm, Largura 16cm)
          </DataGridCell>
          <DataGridCell width="15%" align="center" noBorderRight>
            1
          </DataGridCell>
        </DataGridRow>
        <DataGridRow noBorderBottom>
          <DataGridCell width="100%" noBorderRight style={{ padding: 0 }}>
            <View style={{ padding: 8 }}>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text style={{ marginBottom: 4 }}>Chapa 1 (2.75x1.83 m)</Text>
                <View style={{ width: 20, height: 20 }}>
                  <Image
                    src={
                      true
                        ? "images/horizontal_vertical.png"
                        : "images/vertical.png"
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  height: 300,
                  border: "1px solid #999",
                  backgroundColor: "#e0f7fa",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#555", fontSize: 10 }}>
                  [Placeholder para Imagem do Plano de Corte]
                </Text>
              </View>
            </View>
          </DataGridCell>
        </DataGridRow>
      </DataGrid>
      <TitledTextSection title="Observações e outros:">
        Realizar pedido de materiais com antecedência.
      </TitledTextSection>
    </PdfPageLayout>
  </Document>
);
