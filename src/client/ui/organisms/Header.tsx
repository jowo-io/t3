import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import Button from "@/client/ui/atoms/Button";
import { env } from "@/env.mjs";
import Avatar from "@/client/ui/atoms/Avatar";

type Props = {};

export default function Header({}: Props) {
  const { data: session } = useSession();

  return (
    <div className="mb-5 flex w-full flex-row justify-between gap-2">
      <div className="flex flex-row items-center gap-2">
        <Link className="text-white" href="/">
          Home
        </Link>
        <b className="text-white">|</b>
        <Link className="text-white" href="/post">
          Posts
        </Link>
        {session && (
          <>
            <b className="text-white">|</b>
            <Link className="text-white" href="/account">
              Account
            </Link>
          </>
        )}
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
