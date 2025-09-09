// utils/waste-rate.ts
export function calculateWasteRate(
  sheetWidth: number,
  sheetHeight: number,
  usedRects: { w: number; h: number }[],
): number {
  const totalArea = sheetWidth * sheetHeight;
  const usedArea = usedRects.reduce((sum, rect) => sum + rect.w * rect.h, 0);
  return 1 - usedArea / totalArea;
}
