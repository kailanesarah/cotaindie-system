// errors.ts

export class AppError extends Error {
  status: number;
  details?: any;

  constructor(status: number, message: string, details?: any) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

// Erros comuns
export const Errors = {
  INVALID_DATA: (details?: any) =>
    new AppError(400, "Dados inválidos", details),

  NOT_FOUND: (entity: string) => new AppError(404, `${entity} não encontrado`),

  FOREIGN_KEY_VIOLATION: (entity: string) =>
    new AppError(
      400,
      `Não é possível excluir ou alterar ${entity} pois está vinculado a outras tabelas`,
    ),

  INTERNAL: (details?: any) => new AppError(500, "Erro interno", details),

  MISSING_PARAM: (param: string) => new AppError(400, `${param} é obrigatório`),
};
