import { z } from "zod";

export const lightingAuthValidation = z.object({
  //   title: z.string().min(2).max(200),
  //   text: z.string().min(5).max(5000),
});

export type LightingAuthValidation = z.infer<typeof lightingAuthValidation>;

export const emailAuthValidation = z.object({
  email: z.string().email(),
});

export type EmailAuthValidation = z.infer<typeof emailAuthValidation>;
