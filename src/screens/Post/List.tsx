import Link from "next/link";

import Pagination from "@/client/ui/molecules/Pagination";
import { RouterOutputs } from "@/client/utils/api";
import { env } from "@/env.mjs";
import Avatar from "@/client/ui/atoms/Avatar";

type Props = {
  data?: RouterOutputs["post"]["list"];
  onChangePage: (page: number) => void;
};

export default function PostListScreen({ data, onChangePage }: Props) {
  return (
    <div className="w-full">
      <div className="flex h-lg items-center justify-between">
        <h2 className="text-white">Posts</h2>
        <Link className="text-white " href="/post/add">
          Add post
        </Link>
      </div>

      <div className="flex w-full flex-col gap-xs py-xs">
        {data &&
          data.results.map(({ post, user }) => (
            <Link key={post.id} href={`/post/view/${post.id}`}>
              <article className="overflow-hidden rounded-lg bg-white p-sm shadow">
                <small>
                  <b>{post.slug}</b>
                </small>
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="my-xs">{post.summary}</p>

                {user?.image && (
                  <div>
                    <Avatar
                      size="md"
                      src={env.NEXT_PUBLIC_STORAGE_URL + user?.image}
                    />
                  </div>
                )}
                <small className="text-sm">
                  By {user?.name || "anonymous"}
                </small>
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
    </div>
  );
}
