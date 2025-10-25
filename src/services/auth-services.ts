import type { SupabaseClient, User } from "@supabase/supabase-js";
import { BaseService } from "./base-service";

export class AuthService extends BaseService {
  constructor(supabase: SupabaseClient) {
    super(supabase);
  }

  async login(email: string, password: string) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return data;
    } catch (err) {
      this.handleError(err, "AuthService.login");
    }
  }

  async logout() {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;

      return true;
    } catch (err) {
      this.handleError(err, "AuthService.logout");
    }
  }

  async getUser(): Promise<User | null> {
    try {
      const { data, error } = await this.supabase.auth.getUser();

      if (error) throw error;

      return data.user;
    } catch (err) {
      this.handleError(err, "AuthService.getUser");
    }
  }
}
