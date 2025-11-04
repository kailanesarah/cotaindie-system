import { Document, Image, Text, View } from "@react-pdf/renderer";
import React from "react";
import { DataGrid, DataGridCell, DataGridRow } from "../_components/data-grid";
import { DocumentTitle } from "../_components/document-title";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { Hr } from "../_components/hr";
import { PdfPageLayout } from "../_components/pdf-layout";
import { SectionTitle } from "../_components/section-title";
import { TitledTextSection } from "../_components/title-text-section";

export interface ClientProps {
  name: string;
  code?: string;
}

export interface PiecePlanProps {
  material: any;
  id: string;
  label: string;
  qtde: number | string;
}

export interface SheetPlanProps {
  id: string;
  label: string;
  imageBase64: string;
}

export interface MaterialPlanProps {
  id: string;
  name: string;
  code: string;
  cutDirection: "V" | "VH";
  cutDirectionLabel: string;
  pieces: PiecePlanProps[];
  sheets: SheetPlanProps[];
}

export interface ProjectPlanProps {
  id: string;
  name: string;
  qtde: number;
  materials: MaterialPlanProps[];
}

export interface PlanDataProps {
  quoteCode: string;
  planCode: string;
  title: string;
  generationDate: string;
  projects: ProjectPlanProps[];
  notes?: string;
}

export interface CuttingPlanDocumentProps {
  client: ClientProps;
  plan: PlanDataProps;
}

export const CuttingPlanDocument = ({
  client,
  plan,
}: CuttingPlanDocumentProps) => (
  <Document>
    <PdfPageLayout
      header={
        <Header
          variant="simple"
          docCode={plan.quoteCode}
          dateTime={plan.generationDate}
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
      <DocumentTitle code={plan.planCode} title={plan.title} />
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
      {plan.projects.map((project, projectIndex) => (
        <React.Fragment key={project.id}>
          <SectionTitle>
            {`Projeto ${projectIndex + 1} - ${project.name} (quantidade - ${
              project.qtde
            })`}
          </SectionTitle>
          <DataGrid>
            <DataGridRow isHeader>
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
            {project.materials.map((material, materialIndex) => (
              <React.Fragment key={material.id}>
                <DataGridRow isHeader style={{ backgroundColor: "#f0f0f0" }}>
                  <DataGridCell width="10%" align="center">
                    {materialIndex + 1}
                  </DataGridCell>
                  <DataGridCell style={{ fontWeight: 700 }} flex={1}>
                    {`${material.name} - ${material.code}`}
                  </DataGridCell>
                  <DataGridCell style={{ fontWeight: 700 }} flex={1}>
                    {material.cutDirectionLabel}
                  </DataGridCell>
                  <DataGridCell width="15%" align="center" noBorderRight>
                    <></>
                  </DataGridCell>
                </DataGridRow>
                {material.pieces.map((piece, pieceIndex) => (
                  <DataGridRow key={piece.id}>
                    <DataGridCell width="10%" align="center">
                      {`${materialIndex + 1}.${pieceIndex + 1}`}
                    </DataGridCell>
                    <DataGridCell flex={1}>{piece.label}</DataGridCell>
                    <DataGridCell width="15%" align="center" noBorderRight>
                      {piece.qtde}
                    </DataGridCell>
                  </DataGridRow>
                ))}
                {material.sheets.map((sheet, sheetIndex) => (
                  <DataGridRow
                    key={sheet.id}
                    noBorderBottom={
                      projectIndex === plan.projects.length - 1 &&
                      materialIndex === project.materials.length - 1 &&
                      sheetIndex === material.sheets.length - 1
                    }
                  >
                    <DataGridCell
                      width="100%"
                      noBorderRight
                      style={{ padding: 0 }}
                    >
                      <View style={{ padding: 8 }}>
                        <View
                          style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 8,
                          }}
                        >
                          <Text style={{ marginBottom: 4 }}>{sheet.label}</Text>
                          <View style={{ width: 20, height: 20 }}>
                            <Image
                              src={
                                material.cutDirection === "VH"
                                  ? "images/horizontal_vertical.png"
                                  : "images/vertical.png"
                              }
                            />
                          </View>
                        </View>
                        <Image
                          src={sheet.imageBase64}
                          style={{
                            width: "100%",
                            height: "auto",
                            border: "1px solid #999",
                            backgroundColor: "#f9f9f9",
                            objectFit: "contain",
                          }}
                        />
                      </View>
                    </DataGridCell>
                  </DataGridRow>
                ))}
              </React.Fragment>
            ))}
          </DataGrid>
        </React.Fragment>
      ))}
      {plan.notes && (
        <TitledTextSection title="Observações e outros:">
          {plan.notes}
        </TitledTextSection>
      )}
    </PdfPageLayout>
  </Document>
);
