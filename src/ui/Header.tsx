import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { env } from "@/env.mjs";

const Header: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="mb-5 flex w-full flex-row justify-between gap-2">
      <div className="flex flex-row items-center gap-2">
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
          {sessionData && (
            <span>
              Logged in as <b>{sessionData.user?.name}</b>
            </span>
          )}
        </p>
        {sessionData?.user?.image && (
          <div className="flex h-10 w-10 justify-center overflow-hidden rounded-full  p-1 align-middle">
            <img
              src={env.NEXT_PUBLIC_STORAGE_URL + sessionData.user?.image}
              alt="Avatar image"
            />
          </div>
        )}
        <button
          className="rounded-full bg-white/10 px-4 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Header;
