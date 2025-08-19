import { ROUTES } from "@/constants/urls";
import { errorsResponse } from "@/utils/errors-messages";
import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import { loginService } from "../auth-services";

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      try {
        // Valida se email e password são strings
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          throw errorsResponse(400, "Email ou senha inválidos");
        }

        const data_user = await loginService(
          credentials.email,
          credentials.password
        );

        if (!data_user) {
          throw errorsResponse(401, "Credenciais inválidas");
        }

        return {
          id: data_user.data.user_id,
          name: data_user.data.user_name,
          email: data_user.data.user_email,
        };
        
      } catch (error: any) {
        console.error("Erro no authorize do NextAuth:", error);
        throw errorsResponse(
          500,
          "Erro interno ao autenticar usuário",
          error
        );
      }
    },
  }),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: ROUTES.PUBLIC.SIGNIN,
    signOut: ROUTES.PUBLIC.SIGNOUT,
    error: "/error",
  },
});
