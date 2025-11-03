export const formatDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("pt-BR")
    : new Date().toLocaleDateString("pt-BR");
