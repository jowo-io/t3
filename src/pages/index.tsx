import React, { PropsWithChildren } from "react";

import Head from "@/ui/snowflakes/Head";
import BasicLayout from "@/ui/layout/Basic";

export default function HomePage({}: PropsWithChildren) {
  return (
    <BasicLayout>
      <Head description="This is the welcome page" title="Welcome" />
      <h1 className="text-2xl text-white">Welcome</h1>
      <p className="text-white">This is a demo app.</p>
    </BasicLayout>
  );
}
