import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

import Favicon from "@/client/ui/snowflakes/Favicon";

export default function Document() {
  return (
    <Html>
      <Head>
        <Favicon />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
