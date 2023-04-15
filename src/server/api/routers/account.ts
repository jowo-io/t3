import { z } from "zod";
import { eq } from "drizzle-orm/expressions";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

import { users } from "@/db/auth";

const bucketName = "plunda";

const s3 = new S3Client({
  endpoint: `https://${process.env.STORAGE_ENDPOINT}`,
  region: process.env.STORAGE_REGION,
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY as string,
    secretAccessKey: process.env.STORAGE_SECRET_KEY as string,
  },
});

export const accountRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getSignedAvatarUrl: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) return null;
    const pathName = `avatars/${userId}.webp`;
    const input = {
      Bucket: bucketName,
      Key: pathName,
    };
    const command = new GetObjectCommand(input);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url;
  }),

  getAccount: publicProcedure.query(({ ctx }) => {
    const email = ctx.session?.user?.email;
    if (!email) return [];
    return ctx.db.select().from(users).where(eq(users.email, email));
  }),
});
