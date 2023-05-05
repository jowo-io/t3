import React, { PropsWithChildren } from "react";

import NextHead from "next/head";
import { useRouter } from "next/router";

import { env } from "@/env.mjs";

export const appName = "Test App";
export const defaultOgImage = `/meta/default-og-image.webp`;

interface Props extends PropsWithChildren {
  description: string;
  title: string;
  image?: string;
  pathname?: string;
  isNoIndex?: boolean;
}

export default function Head({
  description = "",
  children,
  pathname,
  isNoIndex,
  ...rest
}: Props) {
  const { asPath } = useRouter();
  const r = useRouter();
  const title = (rest.title ? `${rest.title} | ` : "") + `${appName}`;
  const image = rest.image
    ? rest.image
    : env.NEXT_PUBLIC_SITE_URL + defaultOgImage;

  return (
    <NextHead>
      {/* layout */}
      <meta
        content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"
        name="viewport"
      />
      <meta content="True" name="HandheldFriendly" />

      {isNoIndex && <meta content="noindex" name="robots" />}

      {/* basic */}
      {title && <title>{title}</title>}
      {description && <meta content={description} name="description" />}

      {/* open graph */}
      <meta content="website" property="og:type" />
      <meta content={appName} property="og:site_name" />
      {title && <meta content={title} property="og:title" />}
      {description && <meta content={description} property="og:description" />}
      {image && <meta content={image} property="og:image" />}
      <meta content={env.NEXT_PUBLIC_SITE_URL + asPath} property="og:url" />

      {/* twitter */}
      <meta content="summary" name="twitter:card" />
      {title && <meta content={title} name="twitter:title" />}
      {title && <meta content={title} name="twitter:text:title" />}
      {description && <meta content={description} name="twitter:description" />}
      {image && <meta content={image} name="twitter:image" />}

      {children}
    </NextHead>
  );
}
