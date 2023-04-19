import { S3 } from "@aws-sdk/client-s3";

import { env } from "@/env.mjs";

export const s3 = new S3({
  endpoint: env.STORAGE_ENDPOINT,
  region: env.STORAGE_REGION,
  credentials: {
    accessKeyId: env.STORAGE_ACCESS_KEY as string,
    secretAccessKey: env.STORAGE_SECRET_KEY as string,
  },
});
