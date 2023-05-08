import React, { PropsWithChildren } from "react";

import Head from "@/client/ui/snowflakes/Head";
import BasicTemplate from "@/client/ui/template/Basic";

export default function HomePage({}: PropsWithChildren) {
  return (
    <BasicTemplate>
      <Head description="This is the welcome page" title="Welcome" />
      <h1 className="text-2xl text-white">Welcome</h1>
      <p className="text-white">This is a demo app.</p>
    </BasicTemplate>
  );
}
