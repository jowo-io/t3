import { z } from "zod";
import { eq } from "drizzle-orm/expressions";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

import { users } from "@/db/auth";

export const accountRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAccount: publicProcedure.query(({ ctx }) => {
    const email = ctx.session?.user?.email;
    if (!email) return [];
    return ctx.db.select().from(users).where(eq(users.email, email));
  }),
});
