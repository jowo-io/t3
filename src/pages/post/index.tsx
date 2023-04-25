import { useState } from "react";
import Header from "@/ui/Header";
import PostListScreen from "@/screens/Post/List";
import { api } from "@/utils/client/api";
import Spinner from "@/ui/Spinner";

export default function PostsPage() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = api.post.list.useQuery({ page }, {});

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4">
      <Header />
      <div className="flex flex-col items-center gap-2">
        {isLoading ? (
          <Spinner />
        ) : (
          <PostListScreen data={data} onChangePage={setPage} />
        )}
      </div>
    </main>
  );
}
