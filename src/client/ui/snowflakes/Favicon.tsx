import React from "react";

import { env } from "@/env.mjs";

export interface Props {}

export default function Favicon({}: Props) {
  return (
    <>
      {/* meta */}
      <meta content="#ffffff" name="theme-color" />

      {/* favicons */}
      <link
        href={`${env.NEXT_PUBLIC_SITE_URL}/meta/favicon.ico`}
        rel="shortcut icon"
      />

      {/* ...add more favicon sizes/formats here... */}
    </>
  );
}
