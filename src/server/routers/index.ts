import { exampleRouter } from "@/server/routers/example";
import { accountRouter } from "@/server/routers/account";

import { createTRPCRouter } from "../trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  account: accountRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
