// helper opcional
export function calculate7days(startDate: string): string {
  const date = new Date(startDate);
  date.setDate(date.getDate() + 7);
  return date.toISOString().split("T")[0]; // retorna só AAAA-MM-DD
}
