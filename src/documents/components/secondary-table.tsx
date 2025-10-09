// section-table.tsx
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const pdfStyles = StyleSheet.create({
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  table: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    minHeight: 4, // aumenta o espaço vertical das linhas
  },
  tableHeaderRow: {
    backgroundColor: "#F2F2F2",
  },
  tableCol: {
    borderRightWidth: 1,
    borderRightColor: "#000",
    paddingVertical: 4, // aumenta espaço vertical dentro da célula
    paddingHorizontal: 12, // aumenta espaço horizontal dentro da célula
    justifyContent: "center", // centraliza verticalmente o conteúdo
  },
  textHeader: {
    fontSize: 10,
    fontWeight: "bold",
  },
  textCell: {
    fontSize: 10,
  },
});

export interface SectionTableProps<T extends Record<string, any>> {
  title: string;
  columns: (keyof T)[];
  data: T[];
  largurasFixas?: number[];
}

export function SecondaryTable<T extends Record<string, any>>({
  title,
  columns,
  data,
  largurasFixas,
}: SectionTableProps<T>) {
  if (!data || data.length === 0) return null;

  return (
    <View>
      <Text style={pdfStyles.sectionTitle}>{title}</Text>
      <View style={pdfStyles.table}>
        {/* Cabeçalho */}
        <View style={[pdfStyles.tableRow, pdfStyles.tableHeaderRow]}>
          {columns.map((col, i) => (
            <View
              key={String(col)}
              style={[
                pdfStyles.tableCol,
                largurasFixas ? { width: largurasFixas[i] } : { flex: 1 },
              ]}
            >
              <Text style={pdfStyles.textHeader}>{String(col)}</Text>
            </View>
          ))}
        </View>

        {/* Linhas */}
        {data.map((item, rowIndex) => (
          <View key={rowIndex} style={pdfStyles.tableRow}>
            {columns.map((col, colIndex) => (
              <View
                key={String(col)}
                style={[
                  pdfStyles.tableCol,
                  largurasFixas
                    ? { width: largurasFixas[colIndex] }
                    : { flex: 1 },
                ]}
              >
                <Text style={pdfStyles.textCell}>{item[col] ?? ""}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
