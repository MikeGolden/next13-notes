import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';


export const authOptions: NextAuthOptions = {
  // session {
  //  strategy: 'jwt',
  // },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string
    })
  //   CredentialsProvider({
  //     name: 'as Guest',
  //     credentials: {},
  //     async authorize(credentials) {
  //       const user = {
  //         id: Math.random().toString(),
  //         name: 'Guest',
  //         email: 'guest@example.com',
  //       };
  //       return user;
  //     },
  //   }),
  // ],
  // callbacks: {
  //   async signIn({ user }) {
  //     // block signin if necessary
  //     return true;
  //   }
  // },
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      const userData = await fetch(`${process.env.NEXTAUTH_URL}/api/user?userId=${user.id}`).then(response => response.json());
      session.user.subscriptionStatus = userData.subscriptionStatus;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
