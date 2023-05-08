import { z } from "zod";
import { avatarFileExt } from "@/server/utils/s3";

export const updateAccountValidation = z.object({
  isImage: z.boolean().optional(),
  name: z.string().max(25).optional(),
});

export type UpdateAccountValidation = z.infer<typeof updateAccountValidation>;

export { avatarFileExt };
