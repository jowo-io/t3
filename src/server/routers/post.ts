import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/trpc";

import { postTable } from "@/db/schema";

import { validationSchema } from "@/screens/Post/Add";
import cuid from "cuid";
import { and, eq } from "drizzle-orm";

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

  list: publicProcedure.query(({ ctx }) => {
    const { db } = ctx;

    return db.select().from(postTable).where(eq(postTable.published, true));
  }),
});
