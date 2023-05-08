import { z } from "zod";

// validation schema is used by server
export const addPostValidation = z.object({
  title: z.string().min(2).max(200),
  text: z.string().min(5).max(5000),
});

export type AddPostValidation = z.infer<typeof addPostValidation>;
