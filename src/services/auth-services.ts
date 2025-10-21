import { BaseService } from "./base-service";

class ClassAuthService extends BaseService {
  async signIn(email: string, password: string) {
    try {
      const supabase = await this.supabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return data;
    } catch (err) {
      this.handleError(err, "AuthService.signIn");
    }
  }

  async signOut() {
    try {
      const supabase = await this.supabase();
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      return true;
    } catch (err) {
      this.handleError(err, "AuthService.signOut");
    }
  }

  async getUser() {
    try {
      const supabase = await this.supabase();
      const { data, error } = await supabase.auth.getUser();

      if (error) throw error;

      return data.user;
    } catch (err) {
      this.handleError(err, "AuthService.getUser");
    }
  }
}

export const AuthService = new ClassAuthService();
