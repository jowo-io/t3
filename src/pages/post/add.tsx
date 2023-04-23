import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Header from "@/ui/Header";
import PostAddScreen from "@/screens/Post/Add";

export default function PostsPage() {
  const { data: session } = useSession();
  const { push } = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4">
      <Header />
      <div className="flex flex-col items-center gap-2">
        {session ? (
          <PostAddScreen onSuccess={() => push("/post")} />
        ) : (
          "Please login to see this page"
        )}
      </div>
    </main>
  );
}
