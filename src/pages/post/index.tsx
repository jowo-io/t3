import Header from "@/ui/Header";
import PostListScreen from "@/screens/Post/List";
import { api } from "@/utils/client/api";

export default function PostsPage() {
  const { data, isLoading } = api.post.list.useQuery(undefined, {});

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4">
      <Header />
      <div className="flex flex-col items-center gap-2">
        {isLoading ? "Loading..." : <PostListScreen data={data} />}
      </div>
    </main>
  );
}
