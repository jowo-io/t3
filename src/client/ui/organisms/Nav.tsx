import { ReactNode } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import Button from "@/client/ui/atoms/Button";
import TitledAvatar from "@/client/ui/molecules/TitledAvatar";
import { PathNames } from "@/client/utils/links";

import { env } from "@/env.mjs";

export interface Props {}

export default function Nav({}: Props) {
  const { data: session } = useSession();

  const links = [
    { text: "Home", path: PathNames.home },
    { text: "Posts", path: PathNames.listPosts },
  ];

  if (session) {
    links.push({ text: "Account", path: PathNames.editAccount });
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
        <TitledAvatar
          size="md"
          direction="left"
          color="white"
          src={
            session?.user?.image
              ? env.NEXT_PUBLIC_STORAGE_URL + session?.user?.image
              : undefined
          }
          title={session?.user?.name}
        />
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
