export const formatMeasure = (
  measure?: number[],
  unit?: string,
  measureType?: string,
): string => {
  switch (measureType) {
    case "m2":
      if (measure?.length === 2) {
        return `Medida padrão: ${measure[0]} cm x ${measure[1]} cm`;
      } else if (measure?.length === 1) {
        return `Medida padrão: ${measure[0]} cm`;
      }
      break;

    case "ml":
      if (measure?.length === 1) {
        return `Medida padrão: ${measure[0]} ${unit ?? "cm"}`;
      }
      break;

    case "un":
      return `Medida padrão: ${measure?.[0] ?? 1} ${unit ?? "un"}`;
  }

  return "Medida não definida";
};
