import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import { eq, and } from "drizzle-orm/expressions";

import Header from "@/ui/Header";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { postTable } from "@/db/schema";
import PostViewScreen from "@/screens/Post/View";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { user } = await getServerAuthSession(ctx);

  // if no id is provided return no post
  const postId = ctx.query.id;
  if (typeof postId !== "string") return { props: {} };

  // attempt post fetch
  const posts = await db
    .select()
    .from(postTable)
    .where(eq(postTable.id, postId));

  // is post allowed to be shown?
  const post = posts[0];
  console.log(post);

  if (post && (post.published || user?.id === post.userId)) {
    return { props: { post } };
  }

  // otherwise return no post
  return { props: {} };
};

export default function PostsPage({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4">
      <Header />
      <div className="flex flex-col items-center gap-2">
        <PostViewScreen post={post} />
      </div>
    </main>
  );
}
