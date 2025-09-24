import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Text, View } from "@react-pdf/renderer";

interface TableProps {
  items: string[][];
}

export default function PrimaryTable({ items }: TableProps) {
  const totalRows = items.length;

  return (
    <View style={pdfStyles.table}>
      {items.map((linha, rowIndex) => {
        const isLastRow = rowIndex === totalRows - 1;

        return (
          <View style={pdfStyles.tableRow} key={rowIndex}>
            {linha.map((valor, colIndex) => {
              const [chave, ...rest] = valor.split(":");
              const valorTexto = rest.join(":").trim();
              const isLastCol = colIndex === linha.length - 1;

              return (
                <View
                  key={colIndex} // Remova o flex: 1 daqui, ele já está no pdfStyles.tableCol
                  style={[
                    pdfStyles.tableCol,
                    { paddingVertical: 4 }, // padding interno ajustado
                    isLastCol ? { borderRightWidth: 0 } : {}, // Remova a borda da última coluna
                    isLastRow ? { borderBottomWidth: 0 } : {}, // Remova a borda da última linha
                  ]}
                >
                  <Text style={{ ...pdfStyles.tableCell, marginBottom: 0 }}>
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
