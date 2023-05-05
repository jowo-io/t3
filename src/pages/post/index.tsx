import React, { useState, PropsWithChildren } from "react";

import Head from "@/ui/snowflakes/Head";
import BasicTemplate from "@/ui/templates/Basic";
import PostListScreen from "@/screens/Post/List";
import { api } from "@/utils/client/api";
import Spinner from "@/ui/atoms/Spinner";

export default function ListPostPage({}: PropsWithChildren) {
  const [page, setPage] = useState(0);
  const { data, isLoading } = api.post.list.useQuery({ page }, {});

  return (
    <BasicTemplate>
      <Head description="See all the most recent posts here" title="Posts" />
      {isLoading ? (
        <Spinner />
      ) : (
        <PostListScreen data={data} onChangePage={setPage} />
      )}
    </BasicTemplate>
  );
}
