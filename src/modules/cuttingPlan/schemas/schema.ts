export type CleanSheet = {
  width: number;
  height: number;
  used: {
    name: string;
    width: number;
    height: number;
    x: number;
    y: number;
    rotated: boolean;
    oversize?: boolean;
    displayWidth: number;
    displayHeight: number;
    margin: number;
  }[];
  freeSpace: {
    totalArea: number;
    usedArea: number;
    wasteRate: number; // percentual 0-100
  };
};
