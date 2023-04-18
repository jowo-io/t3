import { S3 } from "@aws-sdk/client-s3";

export const s3 = new S3({
  endpoint: process.env.STORAGE_ENDPOINT,
  region: process.env.STORAGE_REGION,
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY as string,
    secretAccessKey: process.env.STORAGE_SECRET_KEY as string,
  },
});
