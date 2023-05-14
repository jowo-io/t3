import Link from "next/link";

import Pagination from "@/client/ui/molecules/Pagination";
import { RouterOutputs } from "@/client/utils/api";
import { env } from "@/env.mjs";
import Avatar from "@/client/ui/atoms/Avatar";
import Header from "@/client/ui/atoms/Header";
import TitledAvatar from "@/client/ui/molecules/TitledAvatar";
import { PathNames } from "@/client/utils/links";

export interface Props {
  data?: RouterOutputs["post"]["list"];
  onChangePage: (page: number) => void;
}

export default function PostListScreen({ data, onChangePage }: Props) {
  return (
    <div className="w-full">
      <Header
        tag="h2"
        options={
          <Link className="text-white" href={PathNames.addPost}>
            Add post
          </Link>
        }
      >
        Posts
      </Header>

      <div className="flex w-full flex-col gap-xs">
        {data &&
          data.results.map(({ post, user }) => (
            <Link
              key={post.id}
              href={{
                pathname: PathNames.viewPost,
                query: { id: post.id, slug: post.slug },
              }}
              className="block max-w-sm rounded-lg border border-gray-400 bg-white p-sm hover:border-gray-100 hover:bg-gray-100 hover:text-black"
            >
              <Header tag="h4" color="black">
                {post.title}
              </Header>

              <p className="my-xs">{post.summary}</p>

              <TitledAvatar
                size="md"
                src={env.NEXT_PUBLIC_STORAGE_URL + user?.image}
                title={`By ${user?.name || "anonymous"}`}
              />
            </Link>
          ))}
      </div>

      <Pagination
        className="mt-sm"
        pages={data?.pages || 0}
        page={data?.page || 0}
        resultsPerPage={data?.resultsPerPage || 0}
        count={data?.count || 0}
        onChange={onChangePage}
      />
    </div>
  );
}
