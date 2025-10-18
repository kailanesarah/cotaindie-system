import { Page, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import { styles } from "../_styles/pdf-global";

interface PdfPageLayoutProps {
  children: ReactNode;
  header: ReactNode;
  footer: (props: {
    pageNumber: number;
    totalPages: number;
  }) => React.ReactNode;
}

export function PdfPageLayout({
  children,
  header,
  footer,
}: Readonly<PdfPageLayoutProps>) {
  return (
    <Page size="A4" style={styles.page} wrap>
      <View fixed style={styles.fixedHeader}>
        {header}
      </View>
      <View style={styles.pageContent}>{children}</View>
      <View
        fixed
        style={styles.fixedFooter}
        render={({ pageNumber, totalPages }: any) => (
          <View>{footer({ pageNumber, totalPages })}</View>
        )}
      />
    </Page>
  );
}
