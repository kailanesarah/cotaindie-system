// src/components/MaterialsTable.tsx
import { pdfStyles } from "@/styles/pdf_styles/pdfStyles";
import { Text, View } from "@react-pdf/renderer";

interface MaterialsTableProps {
  data: {
    n: string;
    nome: string;
    corte?: string;
    quantidade?: number | null;
    subItems?: {
      n: string;
      nome: string;
      infoExtra: string;
      quantidade: number;
    }[];
  }[];
}

const MaterialsTable = ({ data }: MaterialsTableProps) => {
  return (
    <View style={pdfStyles.table}>
      {/* Cabeçalho */}
      <View style={[pdfStyles.tableRow, pdfStyles.tableHeaderRow]}>
        <View
          style={[pdfStyles.tableCol, { flexGrow: 0.1, borderRightWidth: 0.5 }]}
        >
          <Text style={pdfStyles.boldSmall}>Nº</Text>
        </View>
        <View
          style={[pdfStyles.tableCol, { flexGrow: 1, borderRightWidth: 0.5 }]}
        >
          <Text style={pdfStyles.boldSmall}>Materiais e peças</Text>
        </View>
        <View style={[pdfStyles.tableCol, { flexGrow: 0.2 }]}>
          <Text style={pdfStyles.boldSmall}>Qtde</Text>
        </View>
      </View>

      {/* Linhas de dados */}
      {data.map((item, index) => (
        <View key={index} style={pdfStyles.tableRow}>
          {/* Nº */}
          <View
            style={[
              pdfStyles.tableCol,
              { flexGrow: 0.1, borderBottomWidth: 0.5 },
            ]}
          >
            <Text style={pdfStyles.tableCell}>{item.n}</Text>
          </View>

          {/* Materiais e peças + sub-itens */}
          <View
            style={[
              pdfStyles.tableCol,
              { flexGrow: 1, borderBottomWidth: 0.5 },
            ]}
          >
            <Text style={pdfStyles.boldSmall}>{item.nome}</Text>
            {item.corte && (
              <Text style={[pdfStyles.tableCell, pdfStyles.boldSmall]}>
                {" "}
                (Corte: {item.corte})
              </Text>
            )}
            {item.subItems &&
              item.subItems.map((subItem, subIndex) => (
                <Text key={subIndex} style={pdfStyles.tableCell}>
                  {subItem.n} - {subItem.nome}{" "}
                  {subItem.infoExtra && `(${subItem.infoExtra})`}
                </Text>
              ))}
          </View>

          {/* Quantidade */}
          <View
            style={[
              pdfStyles.tableCol,
              { flexGrow: 0.2, borderBottomWidth: 0.5 },
            ]}
          >
            {item.quantidade != null && (
              <Text style={pdfStyles.tableCell}>{item.quantidade}</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default MaterialsTable;
