import { z } from "zod";
import { eq } from "drizzle-orm/expressions";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/trpc";

import { validationSchema, fileExt } from "@/pages/account";

import { userTable } from "@/db/auth";

const bucketName = "plunda";

function getAvatarPath(userId: string) {
  return `avatars/${userId}.${fileExt}`;
}
function removeVersionQueryParam(path: string): string {
  return path?.split("?")?.[0] || "";
}
function replaceVersionQueryParam(path: string): string {
  if (!path) return "";
  return removeVersionQueryParam(path) + `?v=${Date.now()}`;
}

export const accountRouter = createTRPCRouter({
  createSignedAvatarUrl: protectedProcedure
    .input(
      z.object({
        size: z.number().min(1).max(50000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { s3, user } = ctx;
      const { size } = input;

      const pathName = getAvatarPath(user.id);
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: pathName,
        ContentLength: size,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      return url;
    }),

  update: protectedProcedure
    .input(validationSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;

      const data: { image?: string; name?: string } = {};
      if (input.isImage) {
        data.image = replaceVersionQueryParam(getAvatarPath(user.id));
      }
      if (input.name) {
        data.name = input.name;
      }

      await ctx.db.update(userTable).set(data).where(eq(userTable.id, user.id));

      return ctx.db.select().from(userTable).where(eq(userTable.id, user.id));
    }),

  get: protectedProcedure.query(({ ctx }) => {
    const { user } = ctx;

    return ctx.db.select().from(userTable).where(eq(userTable.id, user.id));
  }),
});
