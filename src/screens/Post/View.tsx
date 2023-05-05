import { Post, User } from "@/db";
import { env } from "@/env.mjs";

type Props = {
  post: Partial<Post>;
  user: Partial<User>;
};

export default function PostViewScreen({ post, user }: Props) {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2 py-2">
      <h2 className="text-3xl font-bold text-white">{post.title}</h2>

      <div className="flex flex-col gap-2 py-2">
        <article
          key={post.id}
          className="overflow-hidden bg-white p-4 shadow sm:rounded-lg"
        >
          <small className="flex w-full flex-row items-center justify-between">
            <b>{post.slug}</b>
            {!post.isPublished && <i>Draft</i>}
          </small>

          <p className="my-2">{post.text}</p>

          <div className="flex w-full flex-row items-center justify-start">
            {user?.image && (
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden  rounded-full p-1">
                <img
                  src={env.NEXT_PUBLIC_STORAGE_URL + user.image}
                  alt="Avatar image"
                />
              </div>
            )}
          </div>
          <small>By {user.name || "anonymous"}</small>
        </article>
      </div>
    </div>
  );
}
