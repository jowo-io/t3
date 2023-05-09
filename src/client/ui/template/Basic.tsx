import React, { PropsWithChildren } from "react";
import Nav from "@/client/ui/organisms/Nav";

interface Props extends PropsWithChildren {}

export default function BasicTemplate({ children }: Props) {
  return (
    <main className="min-h-screen bg-off-black p-sm">
      <Nav />
      <div className="m-auto flex w-full max-w-xs items-center justify-center">
        {children}
      </div>
    </main>
  );
}
