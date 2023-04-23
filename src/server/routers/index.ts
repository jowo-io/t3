import { accountRouter } from "@/server/routers/account";
import { postRouter } from "@/server/routers/post";

import { createTRPCRouter } from "../trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  account: accountRouter,
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
