import * as Sentry from "@sentry/nextjs";
import type { SupabaseClient } from "@supabase/supabase-js";

export abstract class BaseService {
  constructor(protected supabase: SupabaseClient) {}

  protected handleError(error: unknown, context?: string): never {
    const message = error instanceof Error ? error.message : String(error);

    console.error(`[Service Error${context ? ` - ${context}` : ""}]`, message);

    Sentry.captureException(
      error instanceof Error ? error : new Error(message),
    );

    throw error instanceof Error ? error : new Error(message);
  }
}
