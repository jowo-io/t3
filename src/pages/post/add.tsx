import React, { PropsWithChildren } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Head from "@/ui/snowflakes/Head";
import BasicTemplate from "@/ui/template/Basic";
import { api } from "@/utils/client/api";
import PostAddScreen from "@/screens/Post/Add";

export default function AddPostPage({}: PropsWithChildren) {
  const { data: session } = useSession();
  const { push } = useRouter();

  const mutation = api.post.add.useMutation({ onSuccess: () => push("/post") });

  return (
    <BasicTemplate>
      <Head description="Add a new post" title="Add post" />
      {session ? (
        <PostAddScreen
          onSubmit={async (values) => {
            await mutation.mutateAsync(values);
          }}
        />
      ) : (
        <div className="text-white">Please login to see this page</div>
      )}
    </BasicTemplate>
  );
}
