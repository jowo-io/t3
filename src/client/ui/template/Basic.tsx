import React, { PropsWithChildren } from "react";
import Header from "@/client/ui/organisms/Header";

interface Props extends PropsWithChildren {}

export default function BasicTemplate({ children }: Props) {
  return (
    <main className="min-h-screen bg-off-black p-sm">
      <Header />
      <div className="m-auto flex w-full max-w-xs items-center justify-center">
        {children}
      </div>
    </main>
  );
}
