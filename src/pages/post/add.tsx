import React, { PropsWithChildren } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { api } from "@/utils/client/api";
import BasicTemplate from "@/ui/templates/Basic";
import PostAddScreen from "@/screens/Post/Add";

export default function AddPostPage({}: PropsWithChildren) {
  const { data: session, ...rest } = useSession();
  const { push } = useRouter();

  const mutation = api.post.add.useMutation({ onSuccess: () => push("/post") });

  return (
    <BasicTemplate>
      {session ? (
        <PostAddScreen
          onSubmit={async (values) => {
            await mutation.mutateAsync(values);
          }}
        />
      ) : (
        "Please login to see this page"
      )}
    </BasicTemplate>
  );
}
