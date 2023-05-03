import React, { useState, PropsWithChildren } from "react";

import BasicTemplate from "@/ui/templates/Basic";
import PostListScreen from "@/screens/Post/List";
import { api } from "@/utils/client/api";
import Spinner from "@/ui/Spinner";

export default function ListPostPage({}: PropsWithChildren) {
  const [page, setPage] = useState(0);
  const { data, isLoading } = api.post.list.useQuery({ page }, {});

  return (
    <BasicTemplate>
      {isLoading ? (
        <Spinner />
      ) : (
        <PostListScreen data={data} onChangePage={setPage} />
      )}
    </BasicTemplate>
  );
}
