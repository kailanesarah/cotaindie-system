import { StyleSheet, Text, View } from "@react-pdf/renderer";

const pdfStyles = StyleSheet.create({
  table: {
    borderLeftWidth: 1, // Borda esquerda da tabela
    borderTopWidth: 1, // Borda superior da tabela
    borderColor: "#000",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tableCol: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    padding: 8,
    borderRightWidth: 1, // Borda direita da célula
    borderBottomWidth: 1, // Borda inferior da célula
    borderColor: "#000",
  },
  tableKey: {
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 10,
    marginBottom: 0,
    wordBreak: "break-word",
  },
});

interface TableProps<T extends Record<string, any>> {
  items: T[];
}

export default function PrimaryTable<T extends Record<string, any>>({
  items,
}: TableProps<T>) {
  const totalRows = items.length;

  if (totalRows === 0) return null;

  return (
    <View style={pdfStyles.table}>
      {items.map((item, rowIndex) => {
        return (
          <View style={pdfStyles.tableRow} key={rowIndex}>
            {Object.entries(item).map(([chave, valor], colIndex) => {
              const valorTexto = String(valor).includes(":")
                ? String(valor).split(":").slice(1).join(":").trim()
                : String(valor);

              return (
                <View key={colIndex} style={pdfStyles.tableCol}>
                  <Text style={pdfStyles.tableCell}>
                    <Text style={pdfStyles.tableKey}>{chave}:</Text>{" "}
                    {valorTexto}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}
