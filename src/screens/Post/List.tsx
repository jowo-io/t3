import Link from "next/link";
import { Post } from "@/db/schema";

type Props = {
  posts?: Post[];
};

export default function PostListScreen({ posts }: Props) {
  return (
    <>
      <div className="flex h-9 w-full max-w-xs justify-between">
        <h2 className="text-3xl font-bold text-white">Posts</h2>
        <Link className="text-white " href="/post/add">
          Add post
        </Link>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-2 py-2">
        {posts &&
          posts.map((post) => (
            <Link key={post.id} href={`/post/view/${post.id}`}>
              <article className="overflow-hidden bg-white p-4 shadow sm:rounded-lg">
                <small>
                  <b>{post.slug}</b>
                </small>
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="my-2">{post.text}</p>
              </article>
            </Link>
          ))}
      </div>
    </>
  );
}
