import { z } from "zod";
import { eq } from "drizzle-orm";
import lnurl from "lnurl";
import { randomBytes } from "crypto";

import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { env } from "@/env.mjs";
import { lnAuthTable } from "@/schema/db";

export const lnauthRouter = createTRPCRouter({
  create: publicProcedure.mutation(async ({ ctx, input }) => {
    const k1 = randomBytes(32).toString("hex");
    // console.log({ k1 });
    const callbackUrl = `${env.NEXT_PUBLIC_SITE_URL}/api/validate?k1=${k1}&tag=login`;
    // console.log({ callbackUrl });
    const encoded = lnurl.encode(callbackUrl).toUpperCase();
    // console.log({ encoded });
    return { k1, login: `lightning:${encoded}` };
  }),

  get: publicProcedure
    .input(
      z.object({
        k1: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { k1 } = input;

      // console.log({ k1 });

      const rows = await db
        .select({
          lnAuth: {
            id: lnAuthTable.id,
            k1: lnAuthTable.k1,
            pubkey: lnAuthTable.pubkey,
          },
        })
        .from(lnAuthTable)
        .where(eq(lnAuthTable.k1, k1));

      // console.log(rows[0]);

      return rows[0];
    }),
});
