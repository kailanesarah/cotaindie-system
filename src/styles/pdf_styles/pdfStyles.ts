// pdfStyles.ts
import { StyleSheet } from "@react-pdf/renderer";
import { colors } from "./pdfColors";

// ===== Escalas globais =====
const fontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 18,
  xl: 24,
};

const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
};

// ===== Espaçamentos globais =====
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

// ===== Padding global do documento =====
export const pagePadding = {
  paddingTop: 32, // antes era 24
  paddingRight: 32,
  paddingBottom: 32,
  paddingLeft: 32,
};

export const pdfStyles = StyleSheet.create({
  // ===== Página base =====
  page: {
    fontSize: fontSizes.sm,
    fontFamily: "Helvetica",
    backgroundColor: colors.white,
    color: colors.blackDefault,
    ...pagePadding,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // empurra footer para baixo
    minHeight: "100%",
  },

  // ===== Títulos =====
  h1: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.tight,
    fontWeight: "bold",
    color: colors.titleLight,
    marginBottom: spacing.md,
  },
  h2: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.tight,
    fontWeight: "bold",
    color: colors.titleLight,
    marginBottom: spacing.sm,
  },
  h3: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.normal,
    fontWeight: "bold",
    color: colors.titleLight,
    marginBottom: spacing.xs,
  },

  // ===== Textos =====
  body: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
  },
  label: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.normal,
    fontWeight: "medium",
    marginBottom: spacing.xs,
  },
  small: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.normal,
  },

  // ===== Variações em negrito =====
  bold: { fontWeight: "bold" },

  boldBody: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
    fontWeight: "bold",
  },
  boldLabel: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.normal,
    fontWeight: "bold",
  },
  boldSmall: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.normal,
    fontWeight: "bold",
  },

  // ===== Separadores =====
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: spacing.md,
  },

  // ===== Header =====
  headerContainer: {
    marginBottom: spacing.lg,
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: spacing.md, // padding aumentado
  },
  headerLogoColumn: { width: "20%" },
  headerInfoColumn: { width: "80%" },
  headerText: { fontSize: "10px", lineHeight: lineHeights.normal },
  headerTextBold: {
    fontSize: "10px",
    lineHeight: lineHeights.normal,
    fontWeight: "bold",
  },

  // ===== Footer =====
  footerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    paddingBottom: spacing.md, // padding inferior aumentado
    borderTopWidth: 1,
    borderTopColor: "#000",
  },
  pageNumberContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexGrow: 1,
    alignItems: "center",
  },

  // ===== Containers especiais =====
  cutPlanContainer: {
    padding: spacing.sm,
    borderRadius: 4,
    flexDirection: "column",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  cutPlanLabel: {
    fontWeight: "bold",
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  cutPlanImage: { width: "100%", maxHeight: 400, objectFit: "contain" },

  // ===== Tabela genérica =====
  table: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#000",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableRow: { flexDirection: "row", flexWrap: "nowrap" },
  tableCol: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#000",
    flexGrow: 1,
    flexBasis: 0,
  },
  tableHeaderRow: { backgroundColor: colors.white },
  tableCell: { fontSize: fontSizes.xs, lineHeight: 1.4, flexWrap: "wrap" },
  tableKey: { fontWeight: "bold" },
  tableAlignLeft: { textAlign: "left" },
  tableAlignRight: { textAlign: "right" },

  // ===== Utilitários de espaçamento =====
  mtXs: { marginTop: spacing.xs },
  mtSm: { marginTop: spacing.sm },
  mtMd: { marginTop: spacing.md },
  mtLg: { marginTop: spacing.lg },
  mtXl: { marginTop: spacing.xl },

  mbXs: { marginBottom: spacing.xs },
  mbSm: { marginBottom: spacing.sm },
  mbMd: { marginBottom: spacing.md },
  mbLg: { marginBottom: spacing.lg },
  mbXl: { marginBottom: spacing.xl },
});
