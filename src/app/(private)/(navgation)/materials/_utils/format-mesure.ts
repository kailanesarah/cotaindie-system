export const formatMeasure = (
  values: [number] | [number, number],
  unit: string,
) => {
  const [first, second] = values;
  if (second !== undefined) {
    return `${first} ${unit} x ${second} ${unit}`;
  }
  return `${first}${unit}`;
};
