import { z } from "zod";

/** @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>} */
const processEnv = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,

  DB_HOST: process.env.DB_HOST,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,

  NODE_ENV: process.env.NODE_ENV,

  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

  EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
  EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
  EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
  EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
  EMAIL_FROM: process.env.EMAIL_FROM,

  NEXT_PUBLIC_STORAGE_URL: process.env.NEXT_PUBLIC_STORAGE_URL,
  STORAGE_REGION: process.env.STORAGE_REGION,
  STORAGE_ENDPOINT: process.env.STORAGE_ENDPOINT,
  STORAGE_ACCESS_KEY: process.env.STORAGE_ACCESS_KEY,
  STORAGE_SECRET_KEY: process.env.STORAGE_SECRET_KEY,
};

const client = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().min(1).optional(),

  NODE_ENV: z.enum(["development", "test", "production"]),

  NEXT_PUBLIC_STORAGE_URL: z.string().min(1),
});

const server = z.object({
  DB_HOST: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),

  NEXTAUTH_SECRET:
    process.env.NODE_ENV === "production"
      ? z.string().min(1)
      : z.string().min(1).optional(),

  EMAIL_SERVER_USER: z.string().min(1),
  EMAIL_SERVER_PASSWORD: z.string().min(1),
  EMAIL_SERVER_HOST: z.string().min(1),
  EMAIL_SERVER_PORT: z.string().min(1),
  EMAIL_FROM: z.string().min(1),

  STORAGE_REGION: z.string().min(1),
  STORAGE_ENDPOINT: z.string().url(),
  STORAGE_ACCESS_KEY: z.string().min(1),
  STORAGE_SECRET_KEY: z.string().min(1),
});

// Don't touch the part below
// --------------------------

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env);

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === "undefined";

  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer
      ? merged.safeParse(processEnv) // on server we can validate all env vars
      : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
  );

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_") && prop !== "NODE_ENV")
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        );
      return target[/** @type {keyof typeof target} */ (prop)];
    },
  });
}

export { env };
