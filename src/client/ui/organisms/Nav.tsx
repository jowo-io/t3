import { ReactNode } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import Button from "@/client/ui/atoms/Button";
import { env } from "@/env.mjs";
import Avatar from "@/client/ui/atoms/Avatar";

type Props = {};

export default function Nav({}: Props) {
  const { data: session } = useSession();

  const links = [
    { text: "Home", path: "/" },
    { text: "Posts", path: "/post" },
  ];

  if (session) {
    links.push({ text: "Account", path: "/account" });
  }

  return (
    <div className="mb-sm flex w-full flex-row justify-between gap-xs">
      <div className="flex h-md flex-row items-center gap-xs leading-0">
        {links.reduce((acc: ReactNode[], { text, path }, index) => {
          if (index !== 0) {
            acc.push(
              <div
                key={`divider-${text}`}
                className="h-full w-2px bg-white"
              ></div>
            );
          }
          acc.push(
            <Link
              key={`link-${text}`}
              className="text-white hover:text-gray-200"
              href={path}
            >
              {text}
            </Link>
          );
          return acc;
        }, [])}
      </div>

      <div className="flex flex-row items-center gap-xs">
        <div className="text-center text-white">
          {session?.user?.name && (
            <span>
              Logged in as <b>{session.user?.name}</b>
            </span>
          )}
        </div>
        {session?.user?.image && (
          <Avatar
            size="md"
            src={env.NEXT_PUBLIC_STORAGE_URL + session.user?.image}
          />
        )}
        <Button
          onClick={session ? () => void signOut() : () => void signIn()}
          size="sm"
          intent="primary"
        >
          {session ? "Sign out" : "Sign in"}
        </Button>
      </div>
    </div>
  );
}
