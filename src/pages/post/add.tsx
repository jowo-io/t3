import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { api } from "@/utils/client/api";
import Header from "@/ui/Header";
import PostAddScreen from "@/screens/Post/Add";

export default function PostsPage() {
  const { data: session, ...rest } = useSession();
  const { push } = useRouter();

  const mutation = api.post.add.useMutation({ onSuccess: () => push("/post") });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4">
      <Header />
      <div className="flex flex-col items-center gap-2">
        {session ? (
          <PostAddScreen
            onSubmit={async (values) => {
              await mutation.mutateAsync(values);
            }}
          />
        ) : (
          "Please login to see this page"
        )}
      </div>
    </main>
  );
}
