import { Post, User } from "@/schema/db";
import { env } from "@/env.mjs";
import Avatar from "@/client/ui/atoms/Avatar";
import Header from "@/client/ui/atoms/Header";
import TitledAvatar from "@/client/ui/molecules/TitledAvatar";

export interface Props {
  post: Partial<Post>;
  user: Partial<User>;
}

export default function PostViewScreen({ post, user }: Props) {
  return (
    <div className="flex w-full flex-col gap-xs py-xs">
      <Header tag="h2">{post.title}</Header>

      <article
        key={post.id}
        className="overflow-hidden rounded-lg bg-white p-sm shadow"
      >
        <small className="text-sm">{!post.isPublished && <i>Draft</i>}</small>

        <div>{post.text}</div>
      </article>

      <TitledAvatar
        size="lg"
        className="mt-sm"
        color="white"
        src={env.NEXT_PUBLIC_STORAGE_URL + user.image}
        title={`By ${user.name || "anonymous"}`}
      />
    </div>
  );
}
