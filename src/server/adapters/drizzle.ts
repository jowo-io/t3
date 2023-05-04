import type { Adapter } from "next-auth/adapters";

import { createId } from "@/utils/isomorphic/id";
import { and, eq } from "drizzle-orm/expressions";
import { type MySql2Database } from "drizzle-orm/mysql2";
import {
  accountTable,
  sessionTable,
  userTable,
  verificationTokenTable,
} from "@/db";

export function DrizzleAdapter(db: MySql2Database): Adapter {
  return {
    async createUser(userData) {
      await db.insert(userTable).values({
        id: createId(),
        email: userData.email,
        emailVerified: userData.emailVerified,
        name: userData.name,
        image: userData.image,
      });
      const rows = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, userData.email))
        .limit(1);
      const row = rows[0];
      if (!row) throw new Error("User not found");
      return row;
    },
    async getUser(id) {
      const rows = await db
        .select()
        .from(userTable)
        .where(eq(userTable.id, id))
        .limit(1);
      const row = rows[0];
      return row ?? null;
    },
    async getUserByEmail(email) {
      const rows = await db
        .select()
        .from(userTable)
        .where(eq(userTable.email, email))
        .limit(1);
      const row = rows[0];
      return row ?? null;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const rows = await db
        .select()
        .from(userTable)
        .innerJoin(accountTable, eq(userTable.id, accountTable.userId))
        .where(
          and(
            eq(accountTable.providerAccountId, providerAccountId),
            eq(accountTable.provider, provider)
          )
        )
        .limit(1);
      const row = rows[0];
      return row?.user ?? null;
    },
    async updateUser({ id, ...userData }) {
      if (!id) throw new Error("User not found");
      await db.update(userTable).set(userData).where(eq(userTable.id, id));
      const rows = await db
        .select()
        .from(userTable)
        .where(eq(userTable.id, id))
        .limit(1);
      const row = rows[0];
      if (!row) throw new Error("User not found");
      return row;
    },
    async deleteUser(userId) {
      await db.delete(userTable).where(eq(userTable.id, userId));
    },
    async linkAccount(account) {
      await db.insert(accountTable).values({
        id: createId(),
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        type: account.type,
        userId: account.userId,

        // OpenIDTokenEndpointResponse properties
        refresh_token: account.refresh_token,
        access_token: account.access_token,
        expires_at: account.expires_at as number,
        token_type: account.token_type,
        scope: account.scope,
        id_token: account.id_token,
        session_state: account.session_state,
      });
    },
    async unlinkAccount({ providerAccountId, provider }) {
      await db
        .delete(accountTable)
        .where(
          and(
            eq(accountTable.providerAccountId, providerAccountId),
            eq(accountTable.provider, provider)
          )
        );
    },
    async createSession(data) {
      await db.insert(sessionTable).values({
        id: createId(),
        expires: data.expires,
        sessionToken: data.sessionToken,
        userId: data.userId,
      });
      const rows = await db
        .select()
        .from(sessionTable)
        .where(eq(sessionTable.sessionToken, data.sessionToken))
        .limit(1);
      const row = rows[0];
      if (!row) throw new Error("User not found");
      return row;
    },
    async getSessionAndUser(sessionToken) {
      const rows = await db
        .select({
          user: userTable,
          session: {
            id: sessionTable.id,
            userId: sessionTable.userId,
            sessionToken: sessionTable.sessionToken,
            expires: sessionTable.expires,
          },
        })
        .from(sessionTable)
        .innerJoin(userTable, eq(userTable.id, sessionTable.userId))
        .where(eq(sessionTable.sessionToken, sessionToken))
        .limit(1);
      const row = rows[0];
      if (!row) return null;
      const { user, session } = row;
      return {
        user,
        session: {
          id: session.id,
          userId: session.userId,
          sessionToken: session.sessionToken,
          expires: session.expires,
        },
      };
    },
    async updateSession(session) {
      await db
        .update(sessionTable)
        .set(session)
        .where(eq(sessionTable.sessionToken, session.sessionToken));
      const rows = await db
        .select()
        .from(sessionTable)
        .where(eq(sessionTable.sessionToken, session.sessionToken))
        .limit(1);
      const row = rows[0];
      if (!row) throw new Error("Coding bug: updated session not found");
      return row;
    },
    async deleteSession(sessionToken) {
      await db
        .delete(sessionTable)
        .where(eq(sessionTable.sessionToken, sessionToken));
    },
    async createVerificationToken(verificationToken) {
      await db.insert(verificationTokenTable).values({
        expires: verificationToken.expires,
        identifier: verificationToken.identifier,
        token: verificationToken.token,
      });
      const rows = await db
        .select()
        .from(verificationTokenTable)
        .where(eq(verificationTokenTable.token, verificationToken.token))
        .limit(1);
      const row = rows[0];
      if (!row)
        throw new Error("Coding bug: inserted verification token not found");
      return row;
    },
    async useVerificationToken({ identifier, token }) {
      // First get the token while it still exists. TODO: need to add identifier to where clause?
      const rows = await db
        .select()
        .from(verificationTokenTable)
        .where(eq(verificationTokenTable.token, token))
        .limit(1);
      const row = rows[0];
      if (!row) return null;
      // Then delete it.
      await db
        .delete(verificationTokenTable)
        .where(
          and(
            eq(verificationTokenTable.token, token),
            eq(verificationTokenTable.identifier, identifier)
          )
        );
      // Then return it.
      return row;
    },
  };
}
