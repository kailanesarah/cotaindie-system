const statusMessages: Record<number, string> = {
  200: "Requisição bem-sucedida",
  201: "Recurso criado com sucesso",
  204: "Sem conteúdo, mas operação concluída",
};

export function successResponse<T>(
  data: T,
  statusCode: number,
  message?: string,
  details?: unknown
) {
  switch (statusCode) {
    case 200:
      return {
        statusCode,
        message: message ?? statusMessages[200],
        data,
      };
    case 201:
      return {
        statusCode,
        message: message ?? statusMessages[201],
        data,
      };
    case 204:
      return {
        statusCode,
        message: message ?? statusMessages[204],
        data,
      };
    default:
      return {
        statusCode,
        message: message ?? "Operação realizada com sucesso",
        data,
      };
  }
}
