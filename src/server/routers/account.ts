import { z } from "zod";
import { eq } from "drizzle-orm";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import { userTable } from "@/schema/db";
import { updateAccountValidation } from "@/schema/validation";
import {
  bucketName,
  getAvatarPath,
  replaceVersionQueryParam,
} from "@/server/utils/s3";

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
    .input(updateAccountValidation)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;

      const data: { image?: string; name?: string } = {};
      if (input.isImage) {
        data.image = replaceVersionQueryParam(getAvatarPath(user.id));
      } else {
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
