import { ROUTES } from "@/constants/urls";
import { errorsResponse } from "@/utils/errors-messages";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginService } from "../auth-services";

type CustomJWT = {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: any;
};

type CustomSession = {
  user: {
    id?: string;
    name?: string;
    email?: string;
  };
  [key: string]: any;
};

const credentialsProvider = CredentialsProvider({
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    try {
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

      console.log("Dados após login " + JSON.stringify(data_user));



      if (!data_user) {
        throw errorsResponse(401, "Credenciais inválidas");
      }

      return {
        id: data_user.data.user_id,
        name: data_user.data.user_name,
        email: data_user.data.user_email,
      };
    } catch (error: any) {
      throw errorsResponse(500, "Erro interno ao autenticar usuário", error);
    }
  },
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [credentialsProvider],
  session: {
    strategy: "jwt",
  },
  callbacks: {

    async jwt({ token, user }: { token: CustomJWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession; token: CustomJWT }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      return session;
    },

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: ROUTES.PUBLIC.SIGNIN,
    signOut: ROUTES.PUBLIC.SIGNOUT,
    error: "/error",
  },
});
