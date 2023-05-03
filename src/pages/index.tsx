import React, { PropsWithChildren } from "react";

import BasicTemplate from "@/ui/templates/Basic";

export default function HomePage({}: PropsWithChildren) {
  return (
    <BasicTemplate>
      <h1 className="text-2xl text-white">Welcome</h1>
      <p className="text-white">This is a demo app.</p>
    </BasicTemplate>
  );
}
