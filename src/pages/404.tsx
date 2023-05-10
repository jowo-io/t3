import React, { PropsWithChildren } from "react";

import Head from "@/client/ui/snowflakes/Head";
import BasicTemplate from "@/client/ui/templates/Basic";
import ErrorNotFoundScreen from "@/screens/Error/NotFound";

export default function NotFoundPage({}: PropsWithChildren) {
  return (
    <BasicTemplate>
      <Head description="This is a demo app" title="Demo app" />
      <ErrorNotFoundScreen />
    </BasicTemplate>
  );
}
