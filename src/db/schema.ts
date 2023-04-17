import {
  boolean,
  index,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const example = mysqlTable("example", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const posts = mysqlTable(
  "posts",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    user_id: varchar("user_id", { length: 191 }).notNull(),
    published: boolean("published").notNull(),
    slug: varchar("slug", { length: 191 }).notNull(),
    title: text("title").notNull(),
    text: text("text").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (post) => ({
    userIdIndex: index("posts__user_id__idx").on(post.user_id),
  })
);
