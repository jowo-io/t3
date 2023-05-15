import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  DefaultUser,
} from "next-auth";

import EmailProvider from "next-auth/providers/email";

import { DrizzleAdapter } from "./adapters/drizzle";
import { db } from "@/server/db";
import { env } from "@/env.mjs";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: string;
  }
  interface Session extends DefaultSession {
    user: User;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
  },
  adapter: DrizzleAdapter(db),
  theme: { colorScheme: "dark" },
  providers: [
    EmailProvider({
      id: "email",
      name: "Email",
      normalizeIdentifier(identifier: string): string {
        let [local, domain] = identifier.toLowerCase().trim().split("@");
        domain = domain?.split(",")[0];
        return `${local}@${domain}`;
      },
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
      maxAge: 15 * 60, // 15 minutes
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  return { session, user: session?.user };
};
