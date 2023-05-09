import React, { PropsWithChildren } from "react";

import Head from "@/client/ui/snowflakes/Head";
import BasicTemplate from "@/client/ui/template/Basic";

export default function HomePage({}: PropsWithChildren) {
  return (
    <BasicTemplate>
      <Head description="This is the welcome page" title="Welcome" />
      <div className="w-full">
        <h1 className="text-center text-white">Welcome</h1>
        <p className="text-center text-white">This is a demo app.</p>
      </div>
    </BasicTemplate>
  );
}
