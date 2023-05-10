import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "@/client/utils/api";
import usePrimaryDomain from "@/hooks/usePrimaryDomain";
import ErrorBoundary from "@/client/ui/snowflakes/ErrorBoundary";

import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  usePrimaryDomain();

  return (
    <ErrorBoundary>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ErrorBoundary>
  );
};

export default api.withTRPC(MyApp);
