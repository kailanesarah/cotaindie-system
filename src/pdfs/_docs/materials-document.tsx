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

export interface ClientProps {
  name: string;
  code?: string;
}

export interface ReportProjectProps {
  name: string;
  qtde: number;
}

export interface UsedMaterialProps {
  code: string;
  name: string;
  intQtde: number | string;
  qtde: number | string;
  measure: string;
  unitPrice: string;
  total: string;
}

export interface OtherCostProps {
  name: string;
  qtde: number | string;
  value: string;
  total: string;
}

export interface ReportDataProps {
  quoteCode: string;
  reportCode: string;
  title: string;
  generationDate: string;
  projects: ReportProjectProps[];
  usedMaterials: UsedMaterialProps[];
  materialsTotal: string;
  otherCosts: OtherCostProps[];
  otherCostsTotal: string;
  notes?: string;
}

export interface MaterialsDocumentProps {
  client: ClientProps;
  report: ReportDataProps;
}

export const MaterialsDocument = ({
  client,
  report,
}: MaterialsDocumentProps) => (
  <Document>
    <PdfPageLayout
      header={
        <Header
          variant="simple"
          docCode={report.quoteCode}
          dateTime={report.generationDate}
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
      <DocumentTitle code={report.reportCode} title={report.title} />
      <SectionTitle>Dados do cliente</SectionTitle>
      <DataGrid>
        <DataGridRow noBorderBottom>
          <DataGridCell width="70%">
            <Text>
              <Text style={{ fontWeight: 700 }}>Nome: </Text>
              {client.name}
            </Text>
          </DataGridCell>
          <DataGridCell width="30%" noBorderRight>
            <Text>
              <Text style={{ fontWeight: 700 }}>Código: </Text>
              {client.code || "N/A"}
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
        {report.projects.map((project, index) => (
          <DataGridRow
            key={index}
            noBorderBottom={index === report.projects.length - 1}
          >
            <DataGridCell width="15%" align="center">
              {index + 1}
            </DataGridCell>
            <DataGridCell width="70%">{project.name}</DataGridCell>
            <DataGridCell width="15%" align="center" noBorderRight>
              {project.qtde}
            </DataGridCell>
          </DataGridRow>
        ))}
      </DataGrid>
      <SectionTitle>Materiais utilizados</SectionTitle>
      <DataGrid>
        <DataGridRow isHeader>
          <DataGridCell width="15%" isHeader>
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
            Medida
          </DataGridCell>
          <DataGridCell width="15%" isHeader>
            Valor unitário
          </DataGridCell>
          <DataGridCell width="15%" isHeader noBorderRight>
            Total
          </DataGridCell>
        </DataGridRow>
        {report.usedMaterials.map((material, index) => (
          <DataGridRow
            key={index}
            noBorderBottom={index === report.usedMaterials.length - 1}
          >
            <DataGridCell width="15%">{material.code}</DataGridCell>
            <DataGridCell flex={1}>{material.name}</DataGridCell>
            <DataGridCell width="10%" align="center">
              {material.intQtde}
            </DataGridCell>
            <DataGridCell width="10%" align="center">
              {material.qtde}
            </DataGridCell>
            <DataGridCell width="10%" align="center">
              {material.measure}
            </DataGridCell>
            <DataGridCell width="15%">{material.unitPrice}</DataGridCell>
            <DataGridCell width="15%" noBorderRight>
              {material.total}
            </DataGridCell>
          </DataGridRow>
        ))}
      </DataGrid>
      <SummaryTotalRow label="Total:" value={report.materialsTotal} />
      {report.otherCosts.length > 0 && (
        <>
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
            {report.otherCosts.map((cost, index) => (
              <DataGridRow
                key={index}
                noBorderBottom={index === report.otherCosts.length - 1}
              >
                <DataGridCell width="15%" align="center">
                  {index + 1}
                </DataGridCell>
                <DataGridCell flex={1}>{cost.name}</DataGridCell>
                <DataGridCell width="15%" align="center">
                  {cost.qtde}
                </DataGridCell>
                <DataGridCell width="20%">{cost.value}</DataGridCell>
                <DataGridCell width="20%" noBorderRight>
                  {cost.total}
                </DataGridCell>
              </DataGridRow>
            ))}
          </DataGrid>
          <SummaryTotalRow label="Total:" value={report.otherCostsTotal} />
        </>
      )}
      {report.notes && (
        <TitledTextSection title="Observações e outros:">
          {report.notes}
        </TitledTextSection>
      )}
    </PdfPageLayout>
  </Document>
);
