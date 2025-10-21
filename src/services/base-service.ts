import * as Sentry from "@sentry/nextjs";
import { supabaseServer } from "../lib/supabase/server";

export abstract class BaseService {
  private static readonly supabasePromise = supabaseServer();

  protected supabase(): Promise<Awaited<ReturnType<typeof supabaseServer>>> {
    return BaseService.supabasePromise;
  }

  protected handleError(error: unknown, context?: string): never {
    const message = error instanceof Error ? error.message : String(error);

    Sentry.logger.error(`[Service Error${context ? ` - ${context}` : ""}]`, {
      message,
      error,
    });

    Sentry.captureException(
      error instanceof Error ? error : new Error(message),
    );

    throw error instanceof Error ? error : new Error(message);
  }
}
