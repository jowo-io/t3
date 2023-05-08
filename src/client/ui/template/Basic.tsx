import React, { PropsWithChildren } from "react";
import Header from "@/client/ui/organisms/Header";

interface Props extends PropsWithChildren {}

export default function BasicTemplate({ children }: Props) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4">
      <Header />
      <div className="flex flex-col items-center gap-2">{children}</div>
    </main>
  );
}
