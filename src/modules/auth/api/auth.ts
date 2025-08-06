import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import { loginService } from "../auth-services"


const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (
        typeof credentials?.email !== "string" ||
        typeof credentials?.password !== "string"
      ) {
        return null
      }

      const data_user = await loginService(credentials.email, credentials.password)
      console.log(data_user)

      if (data_user) {
        return {
          id: data_user.id,
          name: data_user.username,
          email: data_user.email,
        }
      }

      return null
    },
  }),
]

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.name = token.name as string
      session.user.email = token.email as string
      return session
    },
    async redirect({ url, baseUrl }) {
    return baseUrl
  }
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error",
  },
})
