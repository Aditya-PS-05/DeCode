import { Account, AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import axios from "axios";
import Github from "next-auth/providers/github";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}
export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
  token?: string | null;
}
export const authOptions: AuthOptions = {
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: CustomUser;
      account: Account | null;
    }) {
      try {
        const payload = {
          email: user.email!,
          name: user.name!,
          oauth_id: account?.providerAccountId ?? '',
          provider: account?.provider ?? '',
          image: user?.image,
        };
        const { data } = await axios.post('http://localhost:3000/api/auth/login', payload);

        user.id = data?.user?.id?.toString();
        user.token = data?.user?.token;

        console.log(user.id);
        console.log(user.token);
        // console.log(payload);
        return true;
      } catch {
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({
      session,
      token,
    //   user,
    }: {
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },

  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};
