import { Post } from "@/db/schema";

type Props = {
  post?: Post;
};

export default function PostViewScreen({ post }: Props) {
  if (!post) {
    return <>Post could not be found</>;
  }

  return (
    <div className="flex w-full max-w-xs flex-col gap-2 py-2">
      <h2 className="text-3xl font-bold text-white">{post.title}</h2>

      <div className="flex flex-col gap-2 py-2">
        <article
          key={post.id}
          className="overflow-hidden bg-white p-4 shadow sm:rounded-lg"
        >
          <small>
            <b>{post.slug}</b>
          </small>
          <h3 className="text-xl font-bold">{post.title}</h3>
          <p className="my-2">{post.text}</p>
        </article>
      </div>
    </div>
  );
}
