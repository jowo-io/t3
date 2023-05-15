import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  DefaultUser,
} from "next-auth";

import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { getSession } from "next-auth/react";
import { eq } from "drizzle-orm";

import { DrizzleAdapter } from "./adapters/drizzle";
import { db } from "@/server/db";
import { User, lnAuthTable, userTable } from "@/schema/db";
import { env } from "@/env.mjs";
import { createId } from "@/utils/id";

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
  events: {
    async signIn(message) {
      console.log("signIn", message);
    },
    async signOut(message) {
      console.log("signOut", message);
    },
    async createUser(message) {
      console.log("createUser", message);
    },
    async updateUser(message) {
      console.log("updateUser", message);
    },
    async linkAccount(message) {
      console.log("linkAccount", message);
    },
    async session(message) {
      console.log("session", message);
    },
  },
  callbacks: {
    session({ session, user }) {
      console.log("callback session", { session, user });
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
    async signIn({ account, profile, credentials }) {
      console.log("callback signIn", { account, profile, credentials });
      if (account && account.provider === "lightning") {
        return true;
      }
      return true;
    },
    async jwt({ token, user, account, profile, session }) {
      console.log("callback jwt", {
        token,
        user,
        account,
        profile,
        session,
      });
      token.userRole = "admin";
      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  theme: { colorScheme: "light" },
  pages: {
    signIn: "/signin",
  },
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
    CredentialsProvider({
      id: "lightning",
      name: "Lightning",
      credentials: {
        pubkey: { label: "publickey", type: "text" },
        k1: { label: "k1", type: "text" },
      },
      async authorize(credentials, req) {
        console.log("authorize", credentials);
        const { k1, pubkey } = credentials || {};
        try {
          if (!k1 || !pubkey) throw new Error("Missing credentials");

          const rows = await db
            .select()
            .from(lnAuthTable)
            .where(eq(lnAuthTable.k1, k1));
          const lnAuth = rows?.[0];

          await db.delete(lnAuthTable).where(eq(lnAuthTable.k1, k1));

          if (lnAuth?.pubkey === pubkey) {
            return {
              pubkey,
              role: "user",
              email: "foo@foo.com",
            };
          }
        } catch (error) {
          console.log(error);
        }

        return null;
      },
      // async authorize(credentials, req) {
      // const { k1, pubkey } = credentials || {};
      // try {
      //   if (!k1 || !pubkey) throw new Error("Missing credentials");

      //   const results = await db
      //     .select()
      //     .from(lnAuthTable)
      //     .where(eq(lnAuthTable.k1, k1));
      //   const lnAuth = results?.[0];

      //   await db.delete(lnAuthTable).where(eq(lnAuthTable.k1, k1));

      //   if (lnAuth?.pubkey === pubkey) {
      //     let user: User | undefined = (
      //       await db
      //         .select()
      //         .from(userTable)
      //         .where(eq(userTable.pubkey, pubkey))
      //     )[0];

      //     const session = await getSession({ req });
      //     console.log({ session });
      //     if (!user) {
      //       // if we are logged in, update rather than create
      //       if (session?.user) {
      //         await db
      //           .update(userTable)
      //           .set({ pubkey })
      //           .where(eq(userTable.id, session.user.id));
      //         user = (
      //           await db
      //             .select()
      //             .from(userTable)
      //             .where(eq(userTable.id, session.user.id))
      //         )[0];
      //       } else {
      //         const id = createId();
      //         await db.insert(userTable).values({
      //           id,
      //           pubkey,
      //           role: "user",
      //           email: "foo@foo.com",
      //         });
      //         user = (
      //           await db.select().from(userTable).where(eq(userTable.id, id))
      //         )[0];
      //       }
      //     } else if (session && session.user?.id !== user.id) {
      //       throw new Error("account not linked");
      //     }

      //     return user;
      //   }
      // } catch (error) {
      //   console.log(error);
      // }

      // return null;
      // },
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
