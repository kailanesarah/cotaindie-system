import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Text, View } from "@react-pdf/renderer";

interface TableGenericProps<T extends Record<string, any>> {
  colunas: string[];
  dados: T[];
  larguras?: number[];
}

export function SecondaryTable<T extends Record<string, any>>({
  colunas,
  dados,
  larguras,
}: TableGenericProps<T>) {
  const totalFlex =
    larguras?.reduce((acc, val) => acc + val, 0) ?? colunas.length;

  const linhasPorPagina = 5;
  const chunks: T[][] = [];
  for (let i = 0; i < dados.length; i += linhasPorPagina) {
    chunks.push(dados.slice(i, i + linhasPorPagina));
  }

  return (
    <>
      {chunks.map((bloco, index) => (
        <View
          key={index}
          wrap={false}
          break={index > 0}
          style={pdfStyles.table}
        >
          {/* Cabeçalho */}
          <View style={[pdfStyles.tableRow, pdfStyles.tableHeaderRow]}>
            {colunas.map((col, i) => (
              <View
                key={i}
                style={[
                  pdfStyles.tableCol,
                  { flex: larguras ? larguras[i] / totalFlex : 1 },
                ]}
              >
                <Text style={[pdfStyles.boldSmall, pdfStyles.tableAlignLeft]}>
                  {col}
                </Text>
              </View>
            ))}
          </View>

          {/* Linhas */}
          {bloco.map((item, rowIndex) => (
            <View key={rowIndex} style={pdfStyles.tableRow}>
              {colunas.map((col, colIndex) => (
                <View
                  key={colIndex}
                  style={[
                    pdfStyles.tableCol,
                    { flex: larguras ? larguras[colIndex] / totalFlex : 1 },
                  ]}
                >
                  <Text
                    style={
                      typeof item[col] === "number"
                        ? [pdfStyles.small, pdfStyles.tableAlignRight]
                        : [pdfStyles.small, pdfStyles.tableAlignLeft]
                    }
                  >
                    {item[col] ?? ""}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </>
  );
}
