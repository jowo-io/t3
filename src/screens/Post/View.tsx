import { Post, User } from "@/schema/db";
import { env } from "@/env.mjs";
import Avatar from "@/client/ui/atoms/Avatar";
import Header from "@/client/ui/atoms/Header";

type Props = {
  post: Partial<Post>;
  user: Partial<User>;
};

export default function PostViewScreen({ post, user }: Props) {
  return (
    <div className="flex w-full flex-col gap-xs py-xs">
      <Header tag="h2">{post.title}</Header>

      <article
        key={post.id}
        className="overflow-hidden rounded-lg bg-white p-sm shadow"
      >
        <small className="flex w-full flex-row items-center justify-between">
          <b>{post.slug}</b>
          {!post.isPublished && <i>Draft</i>}
        </small>

        <div>{post.text}</div>

        {user?.image && (
          <div>
            <Avatar size="lg" src={env.NEXT_PUBLIC_STORAGE_URL + user.image} />
          </div>
        )}
        <small className="text-sm">By {user.name || "anonymous"}</small>
      </article>
    </div>
  );
}
