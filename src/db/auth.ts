import {
  datetime,
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

export const accountTable = mysqlTable(
  "account",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    type: varchar("type", { length: 191 }).notNull(),
    provider: varchar("provider", { length: 191 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 191 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().onUpdateNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),

    // OpenIDTokenEndpointResponse properties
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 191 }),
    scope: varchar("scope", { length: 191 }),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    providerProviderAccountIdIndex: uniqueIndex(
      "account__provider__providerAccountId__idx"
    ).on(account.provider, account.providerAccountId),
    userIdIndex: index("account__userId__idx").on(account.userId),
  })
);

export const sessionTable = mysqlTable(
  "session",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    sessionToken: varchar("sessionToken", { length: 191 }).notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    expires: datetime("expires").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow().onUpdateNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  },
  (session) => ({
    sessionTokenIndex: uniqueIndex("session__sessionToken__idx").on(
      session.sessionToken
    ),
    userIdIndex: index("session__userId__idx").on(session.userId),
  })
);

export const userTable = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    name: varchar("name", { length: 191 }),
    email: varchar("email", { length: 191 }).notNull(),
    emailVerified: timestamp("emailVerified"),
    image: varchar("image", { length: 191 }),
    createdAt: timestamp("createdAt").notNull().defaultNow().onUpdateNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  },
  (user) => ({
    emailIndex: uniqueIndex("user__email__idx").on(user.email),
  })
);

export const verificationTokenTable = mysqlTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 191 }).primaryKey().notNull(),
    token: varchar("token", { length: 191 }).notNull(),
    expires: datetime("expires").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow().onUpdateNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  },
  (verificationToken) => ({
    tokenIndex: uniqueIndex("verification_token__token__idx").on(
      verificationToken.token
    ),
  })
);
