export function generateSignatureDateLocation(city: string): string {
  const now = new Date();

  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const dia = now.getDate().toString().padStart(2, "0");
  const mes = meses[now.getMonth()];
  const ano = now.getFullYear();

  return `${city}, ${dia} de ${mes} de ${ano}`;
}
