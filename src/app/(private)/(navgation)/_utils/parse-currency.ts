export const parseCurency = (valor: number) => {
  // "R$ 5.000,50"
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};
