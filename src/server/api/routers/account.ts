import { z } from "zod";
import { eq } from "drizzle-orm/expressions";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { users } from "@/db/auth";

const bucketName = "plunda";
const ext = "png";

function getAvatarPath(userId: string) {
  return `avatars/${userId}.${ext}`;
}
function removeVersionQueryParam(path: string): string {
  if (!path) return "";
  return path.split("?")[0];
}
function replaceVersionQueryParam(path: string): string {
  if (!path) return "";
  return removeVersionQueryParam(path) + `?v=${Date.now()}`;
}

export const accountRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createSignedAvatarUrl: publicProcedure.mutation(async ({ ctx }) => {
    const { s3, session } = ctx;
    const userId = session?.user?.id;
    if (!userId) return null;
    const pathName = getAvatarPath(userId);
    const command = new PutObjectCommand({ Bucket: bucketName, Key: pathName });
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url;
  }),

  updateAccount: publicProcedure
    .input(
      z.object({
        isImage: z.boolean().optional(),
        name: z.string().min(2).max(100).optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { s3, session } = ctx;
      const userId = session?.user?.id;
      const email = session?.user?.email;
      if (!email || !userId) return [];
      const data: { image?: string; name?: string } = {};

      if (input.isImage) {
        data.image = replaceVersionQueryParam(getAvatarPath(userId));
      }
      if (input.name) {
        data.name = input.name;
      }

      return ctx.db
        .update(users)
        .set(data)
        .where(eq(users.email, email))
        .returning();
    }),

  getAccount: publicProcedure.query(({ ctx }) => {
    const email = ctx.session?.user?.email;
    if (!email) return [];
    return ctx.db.select().from(users).where(eq(users.email, email));
  }),
});
