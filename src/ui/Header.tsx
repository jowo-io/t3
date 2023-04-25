import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import Button from "@/ui/Button";
import { env } from "@/env.mjs";

const Header: React.FC = () => {
  const { data: sessionData } = useSession();

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
        {sessionData && (
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
          {sessionData?.user?.name && (
            <span>
              Logged in as <b>{sessionData.user?.name}</b>
            </span>
          )}
        </p>
        {sessionData?.user?.image && (
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden  rounded-full p-1">
            <img
              src={env.NEXT_PUBLIC_STORAGE_URL + sessionData.user?.image}
              alt="Avatar image"
            />
          </div>
        )}
        <Button
          onClick={sessionData ? () => void signOut() : () => void signIn()}
          size="small"
          intent="secondary"
        >
          {sessionData ? "Sign out" : "Sign in"}
        </Button>
      </div>
    </div>
  );
};

export default Header;
