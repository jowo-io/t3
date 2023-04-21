import {
  boolean,
  index,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const exampleTable = mysqlTable("example", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const postTable = mysqlTable(
  "post",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    userId: varchar("userId", { length: 191 }).notNull(),
    published: boolean("published").notNull(),
    slug: varchar("slug", { length: 191 }).notNull(),
    title: text("title").notNull(),
    text: text("text").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (post) => ({
    userIdIndex: index("post__userId__idx").on(post.userId),
  })
);
