// src/pdfs/layout/PDFLayout.tsx
import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import Footer from "./components/footer";
import Header from "./components/header";
import type { EmpresaInfo } from "./types/simple-header";

interface PDFLayoutProps {
  empresa: EmpresaInfo[];
  children: React.ReactNode;
}

export default function PDFLayout({ empresa, children }: PDFLayoutProps) {
  const empresaData = empresa?.[0] || {};
  return (
    <Document>
      <Page size="A4" style={pdfStyles.page} wrap>
        <Header data={empresaData} />

        <View style={pdfStyles.body}>{children}</View>

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
