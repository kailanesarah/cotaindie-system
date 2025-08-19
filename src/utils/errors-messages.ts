import Boom from "@hapi/boom";

export function errorsResponse(
  statusCode: number,
  message?: string,
  details?: unknown
) {
  switch (statusCode) {
    case 400:
      return Boom.badRequest(message ?? "Requisição inválida", details);
    case 401:
      return Boom.unauthorized(message ?? "Não autorizado");
    case 403:
      return Boom.forbidden(message ?? "Acesso proibido", details);
    case 404:
      return Boom.notFound(message ?? "Recurso não encontrado", details);
    case 409:
      return Boom.conflict(message ?? "Conflito na requisição", details);
    case 500:
      return Boom.internal(message ?? "Erro interno do servidor", details);
    default:
      return Boom.boomify(new Error(message ?? "Erro desconhecido"), {
        statusCode,
        data: details,
      });
  }
}
