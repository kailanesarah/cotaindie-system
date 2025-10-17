export interface Piece {
  id?: string;
  name: string;
  width: number;
  height: number;
  qty?: number;
  product_id?: string;
  allowRotate?: boolean;
}

export interface UsedRect {
  x: number;
  y: number;
  width: number;
  height: number;
  name?: string;
  rotated?: boolean;
  oversize?: boolean;
  margin?: number;
}

export interface CleanSheet {
  width: number;
  height: number;
  used?: UsedRect[];
  freeSpace: {
    totalArea: number;
    usedArea: number;
    wasteRate: number;
  };
}

export interface MaterialResult {
  product_id: string;
  product_name: string;
  totalSheets: number;
  totalUsedArea: number;
  totalArea: number;
  wasteRate: number;
  paidSheets: number;
  sheets: CleanSheet[];
  svgs?: MaterialSVG[];
  utilization: number;
}

export interface DrawSheet {
  w: number;
  h: number;
  usedRects: {
    x: number;
    y: number;
    w: number;
    h: number;
    rotated: boolean;
    name: string;
    oversize?: boolean;
    margin?: number;
  }[];
  freeRects?: { x: number; y: number; w: number; h: number }[];
  material?: string;
}

export interface MaterialSVG {
  svg: string;
  base64?: string;
  filePath?: string;
  url: string;
  scaledSheets: DrawSheet[];
  material?: string;
}

// Define o tipo de dados simples que drawSheetsSVG irá retornar (sem métricas)
interface CleanSVGData {
  svg: string;
  url: string;
  scaledSheets: DrawSheet[]; // Mantido para referência interna se necessário, mas ignorado no retorno principal
  material?: string;
}
