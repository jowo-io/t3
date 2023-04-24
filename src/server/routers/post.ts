import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/trpc";

import { userTable, postTable } from "@/db";

import { validationSchema } from "@/screens/Post/Add";
import cuid from "cuid";
import { eq, desc, sql } from "drizzle-orm";

export const postRouter = createTRPCRouter({
  add: protectedProcedure
    .input(validationSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, user } = ctx;

      const slug = input.title
        .replace(/[^A-Z0-9]+/gi, " ")
        .trim()
        .toLowerCase()
        .split(" ")
        .join("-");

      const summary = input.text.substring(0, 100);

      const id = cuid();

      await db.insert(postTable).values({
        id,
        userId: user.id,
        published: true,
        title: input.title,
        text: input.text,
        summary,
        slug,
      });

      return db.select().from(postTable).where(eq(postTable.id, id));
    }),

  list: publicProcedure
    .input(
      z
        .object({
          page: z.number().int().nonnegative().finite().optional().default(0),
          resultsPerPage: z
            .number()
            .int()
            .nonnegative()
            .max(20)
            .optional()
            .default(3),
        })
        .optional()
        .default({})
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { page, resultsPerPage } = input;

      const where = eq(postTable.published, true);

      const count = (
        await db
          .select({ count: sql`count(*)` })
          .from(postTable)
          .where(where)
      )?.pop()?.count as number;

      const pages = Math.ceil(count / resultsPerPage);

      const results = await db
        .select({
          post: {
            id: postTable.id,
            title: postTable.title,
            summary: postTable.summary,
            slug: postTable.slug,
          },
          user: {
            id: userTable.id,
            name: userTable.name,
            image: userTable.image,
          },
        })
        .from(postTable)
        .limit(resultsPerPage)
        .offset(page * resultsPerPage)
        .orderBy(desc(postTable.createdAt))
        .where(where)
        .leftJoin(userTable, eq(userTable.id, postTable.userId));
      return { results, count, pages, page, resultsPerPage };
    }),
});
