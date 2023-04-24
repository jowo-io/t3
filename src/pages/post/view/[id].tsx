import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { eq, and } from "drizzle-orm/expressions";

import Header from "@/ui/Header";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { postTable, userTable } from "@/db";
import PostViewScreen from "@/screens/Post/View";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { user: currentUser } = await getServerAuthSession(ctx);

  // if no id is provided return no post
  const postId = ctx.query.id;
  if (typeof postId !== "string") return { props: {} };

  // attempt post select
  const data = await db
    .select({
      post: {
        id: postTable.id,
        title: postTable.title,
        text: postTable.text,
        slug: postTable.slug,
        published: postTable.published,
      },
      user: {
        id: userTable.id,
        name: userTable.name,
        image: userTable.image,
      },
    })
    .from(postTable)
    .where(eq(postTable.id, postId))
    .leftJoin(userTable, eq(userTable.id, postTable.userId));

  // is post allowed to be shown?
  const post = data?.[0]?.post;
  const user = data?.[0]?.user;
  if (post && user && (post.published || currentUser?.id === user.id)) {
    return { props: { post, user } };
  }

  // otherwise return no post
  return { props: {} };
};

export default function PostsPage({
  post,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4">
      <Header />
      <div className="flex flex-col items-center gap-2">
        <PostViewScreen post={post} user={user} />
      </div>
    </main>
  );
}
