import { ReactNode } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import Button from "@/client/ui/atoms/Button";
import { env } from "@/env.mjs";
import Avatar from "@/client/ui/atoms/Avatar";

type Props = {};

export default function Header({}: Props) {
  const { data: session } = useSession();

  const links = [
    { text: "Home", path: "/" },
    { text: "Posts", path: "/post" },
  ];

  if (session) {
    links.push({ text: "Account", path: "/account" });
  }

  return (
    <div className="mb-5 flex w-full flex-row justify-between gap-2">
      <div className="leading-0 flex h-3 flex-row items-center gap-3">
        {links.reduce((acc: ReactNode[], { text, path }, index) => {
          if (index !== 0) {
            acc.push(
              <div
                key={`divider-${text}`}
                className="h-full w-0.5 bg-white"
              ></div>
            );
          }
          acc.push(
            <Link
              key={`link-${text}`}
              className="text-white hover:text-slate-200"
              href={path}
            >
              {text}
            </Link>
          );

          return acc;
        }, [])}
      </div>

      <div className="flex flex-row items-center gap-2">
        <p className="text-center text-white">
          {session?.user?.name && (
            <span>
              Logged in as <b>{session.user?.name}</b>
            </span>
          )}
        </p>
        {session?.user?.image && (
          <Avatar
            size="small"
            src={env.NEXT_PUBLIC_STORAGE_URL + session.user?.image}
          />
        )}
        <Button
          onClick={session ? () => void signOut() : () => void signIn()}
          size="small"
          intent="secondary"
        >
          {session ? "Sign out" : "Sign in"}
        </Button>
      </div>
    </div>
  );
}
