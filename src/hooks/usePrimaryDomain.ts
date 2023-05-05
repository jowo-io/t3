import { useEffect } from "react";

import { env } from "@/env.mjs";

// this hook checks the current domain against the `NEXT_PUBLIC_SITE_URL` env var
// if they don't match the user is sent to the latter.
// This has several advantages:
// * next-auth never redirects you to the wrong domain.
// * prevents the app be accessed from the various vercel urls.
// * cors issues where `NEXT_PUBLIC_SITE_URL` is used on a different domain to loading assets

export default function usePrimaryDomain() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.origin !== env.NEXT_PUBLIC_SITE_URL
    ) {
      window.location.assign(
        env.NEXT_PUBLIC_SITE_URL + window.location.pathname
      );
    }
  }, []);
}
