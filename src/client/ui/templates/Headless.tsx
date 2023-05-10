import React, { PropsWithChildren } from "react";

export interface Props extends PropsWithChildren {}

export default function HeadlessTemplate({ children }: Props) {
  return (
    <main className="min-h-screen bg-off-black p-sm">
      <div className="m-auto flex w-full max-w-xs items-center justify-center">
        {children}
      </div>
    </main>
  );
}
