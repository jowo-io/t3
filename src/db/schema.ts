import {
  varchar,
  text,
  uniqueIndex,
  timestamp,
  pgTable,
} from "drizzle-orm/pg-core";

export const posts = pgTable(
  "posts",
  {
    id: varchar("id", { length: 191 }).primaryKey().notNull(),
    user_id: varchar("user_id", { length: 191 }).notNull(),
    slug: varchar("slug", { length: 191 }).notNull(),
    title: text("title").notNull(),
    text: text("text").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (post) => ({
    userIdIndex: uniqueIndex("posts__user_id__idx").on(post.user_id),
  })
);
