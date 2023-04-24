import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

import { type AppRouter } from "@/server/routers";

import { getBaseUrl } from "@/utils/isomorphic/url";

import { env } from "@/env.mjs";

export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      abortOnUnmount: true,
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;

