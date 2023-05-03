import Link from "next/link";

import Pagination from "@/ui/molecules/Pagination";
import { RouterOutputs } from "@/utils/client/api";
import { env } from "@/env.mjs";

type Props = {
  data?: RouterOutputs["post"]["list"];
  onChangePage: (page: number) => void;
};

export default function PostListScreen({ data, onChangePage }: Props) {
  return (
    <>
      <div className="flex h-9 w-full max-w-xs justify-between">
        <h2 className="text-3xl font-bold text-white">Posts</h2>
        <Link className="text-white " href="/post/add">
          Add post
        </Link>
      </div>

      <div className="flex w-full max-w-xs flex-col gap-2 py-2">
        {data &&
          data.results.map(({ post, user }) => (
            <Link key={post.id} href={`/post/view/${post.id}`}>
              <article className="overflow-hidden bg-white p-4 shadow sm:rounded-lg">
                <small>
                  <b>{post.slug}</b>
                </small>
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="my-2">{post.summary}</p>

                <div className="flex w-full flex-row items-center justify-start">
                  {user?.image && (
                    <div className="flex h-8 w-8 items-center justify-center overflow-hidden  rounded-full p-1">
                      <img src={env.NEXT_PUBLIC_STORAGE_URL + user?.image} />
                    </div>
                  )}
                </div>
                <small>By {user?.name || "anonymous"}</small>
              </article>
            </Link>
          ))}
      </div>

      <Pagination
        pages={data?.pages || 0}
        page={data?.page || 0}
        resultsPerPage={data?.resultsPerPage || 0}
        count={data?.count || 0}
        onChange={onChangePage}
      />
    </>
  );
}
