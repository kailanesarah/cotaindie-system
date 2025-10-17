import { Text, View } from "@react-pdf/renderer";
import type { JSX } from "react";

export interface MaterialItem {
  n: string;
  nome: string;
  corte?: string;
  quantidade?: number | null;
  subItems?: {
    n: string;
    nome: string;
    infoExtra?: string;
    quantidade: number;
  }[];
}

interface MaterialsTableProps {
  data: MaterialItem[];
}

const MaterialsTable = ({ data }: MaterialsTableProps) => {
  const itemPrincipalCellBg = "#e8e8e8";
  const headerBg = "#f0f0f0";

  const renderRow = (
    n: string,
    content: JSX.Element,
    qtde: number | null,
    isSubItem: boolean = false,
    isLastRow: boolean = false,
    boldNumber: boolean = false,
  ) => (
    <View
      key={n}
      style={{
        flexDirection: "row",
        borderBottomWidth: isLastRow ? 0 : 1,
        borderBottomColor: "#000",
      }}
    >
      {/* Nº */}
      <View
        style={{
          flex: 0.1,
          borderRightWidth: 1,
          borderRightColor: "#000",
          padding: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 10, fontWeight: boldNumber ? "bold" : "normal" }}
        >
          {n}
        </Text>
      </View>

      {/* Materiais e peças */}
      <View
        style={{
          flex: 0.7,
          borderRightWidth: 1,
          borderRightColor: "#000",
          padding: 4,
          backgroundColor: isSubItem ? "#fff" : itemPrincipalCellBg,
          justifyContent: "center",
        }}
      >
        {content}
      </View>

      {/* Quantidade */}
      <View
        style={{
          flex: 0.2,
          padding: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {qtde != null && (
          <Text
            style={{ fontSize: 10, fontWeight: isSubItem ? "bold" : "normal" }}
          >
            {qtde}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={{ borderWidth: 1, borderColor: "#000" }}>
      {/* Cabeçalho */}
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "#000",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 0.1,
            borderRightWidth: 1,
            borderRightColor: "#000",
            padding: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 10, textAlign: "center" }}
          >
            Nº
          </Text>
        </View>
        <View
          style={{
            flex: 0.7,
            borderRightWidth: 1,
            borderRightColor: "#000",
            padding: 4,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 10 }}>
            Materiais e peças
          </Text>
        </View>
        <View
          style={{
            flex: 0.2,
            padding: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 10 }}>Qtde</Text>
        </View>
      </View>

      {/* Linhas de dados */}
      {data.flatMap((item, itemIndex) => {
        const rows: JSX.Element[] = [];
        const totalSubItems = item.subItems ? item.subItems.length : 0;

        // Linha principal
        rows.push(
          renderRow(
            item.n,
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                {item.nome}
              </Text>
              {item.corte && (
                <Text style={{ fontSize: 9 }}>Corte: {item.corte}</Text>
              )}
            </View>,
            item.quantidade ?? null,
            false,
            totalSubItems === 0 && itemIndex === data.length - 1,
            true, // número em negrito
          ),
        );

        // Sub-itens
        if (item.subItems) {
          item.subItems.forEach((subItem, subIndex) => {
            const isLastRow =
              itemIndex === data.length - 1 &&
              subIndex === item.subItems!.length - 1;
            rows.push(
              renderRow(
                subItem.n,
                <Text
                  style={{ fontSize: 10 }}
                >{`- ${subItem.nome} ${subItem.infoExtra ? `(${subItem.infoExtra})` : ""}`}</Text>,
                subItem.quantidade,
                true,
                isLastRow,
                false,
              ),
            );
          });
        }

        return rows;
      })}
    </View>
  );
};

export default MaterialsTable;
