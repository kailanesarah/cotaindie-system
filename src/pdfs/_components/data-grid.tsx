import { Text, View } from "@react-pdf/renderer";
import React from "react";

interface DataGridCellProps {
  children: React.ReactNode;
  width?: string;
  flex?: number;
  style?: object;
  align?: "left" | "center" | "right";
  isHeader?: boolean;
  noBorderRight?: boolean;
}

export const DataGridCell = ({
  children,
  width,
  flex,
  style = {},
  align = "left",
  isHeader = false,
  noBorderRight = false,
}: Readonly<DataGridCellProps>) => {
  const cellStyles: any = {
    width,
    flex,
    padding: 4,
    textAlign: align,
    fontFamily: isHeader ? "Helvetica-Bold" : "Helvetica",
    borderRightWidth: noBorderRight ? 0 : 1,
    borderColor: "#000",
    ...style,
  };

  if (width) delete cellStyles.flex;
  if (!width && !flex) cellStyles.flex = 1;

  return (
    <View style={cellStyles}>
      {typeof children === "string" || typeof children === "number" ? (
        <Text>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
};

interface DataGridRowProps {
  children: React.ReactNode;
  style?: object;
  isHeader?: boolean;
  noBorderBottom?: boolean;
}

export const DataGridRow = ({
  children,
  style = {},
  isHeader = false,
  noBorderBottom = false,
}: Readonly<DataGridRowProps>) => {
  const rowStyles = {
    ...style,
    flexDirection: "row" as const,
    borderBottomWidth: noBorderBottom ? 0 : 1,
    borderColor: "#000",
    backgroundColor: isHeader ? "#f0f0f0" : "transparent",
  };

  return <View style={rowStyles}>{children}</View>;
};

interface DataGridProps {
  children: React.ReactNode;
  style?: object;
}

export const DataGrid = ({ children, style = {} }: Readonly<DataGridProps>) => {
  const gridStyles = {
    borderWidth: 1,
    borderColor: "#000",
    ...style,
  };
  return <View style={gridStyles}>{children}</View>;
};
