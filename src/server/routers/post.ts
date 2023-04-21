import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/trpc";

import { postTable } from "@/db/schema";

import { validationSchema } from "@/screens/Post/Post";
import cuid from "cuid";
import { and, eq } from "drizzle-orm";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

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

      const id = cuid();

      await db.insert(postTable).values({
        id,
        userId: user.id,
        published: true,
        slug,
        title: input.title,
        text: input.text,
      });

      return db.select().from(postTable).where(eq(postTable.id, id));
    }),

  list: protectedProcedure.query(({ ctx }) => {
    const { db, session } = ctx;
    const { user } = session;

    return db
      .select()
      .from(postTable)
      .where(and(eq(postTable.userId, user.id), eq(postTable.published, true)));
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
