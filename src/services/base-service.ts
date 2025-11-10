import * as Sentry from "@sentry/nextjs";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface PostgresError {
  code: string;
  message: string;
  detail?: string;
  hint?: string;
}

export abstract class BaseService {
  constructor(protected supabase: SupabaseClient) {}

  protected handleError(error: unknown, context?: string): never {
    let payload: { code?: string; message: string };

    const pgErr = error as PostgresError;

    if (pgErr?.code) {
      payload = {
        code: pgErr.code,
        message: this.getPostgresMessage(pgErr),
      };
    } else if (error instanceof Error) {
      payload = { message: error.message };
    } else {
      payload = { message: String(error) };
    }

    console.error(`[Service Error${context ? ` - ${context}` : ""}]`, payload);

    Sentry.captureException(
      error instanceof Error ? error : new Error(payload.message),
    );

    throw payload;
  }

  private getPostgresMessage(err: PostgresError): string {
    switch (err.code) {
      case "23503":
        return "Não é possível executar esta operação: item ainda está sendo usado em outro lugar.";
      case "23505":
        return "Violação de chave única: já existe um registro com esses dados.";
      default:
        return err.message || "Erro de banco de dados desconhecido.";
    }
  }
}
