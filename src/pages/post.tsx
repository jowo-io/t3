import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import { eq, and } from "drizzle-orm/expressions";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { postTable } from "@/db/schema";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { user } = await getServerAuthSession(ctx);
  if (!user?.id) return { props: { posts: [] } };

  const posts = await db
    .select()
    .from(postTable)
    .where(and(eq(postTable.userId, user.id), eq(postTable.published, true)));

  return {
    props: { posts },
  };
};

export default function PostsPage({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();

  return (
    <>
      {session && (
        <div>
          <h1>posts</h1>
          <hr />
          {posts.map((post) => (
            <div key={post.id}>
              <h3 className="text-2xl text-blue-300">{post.title}</h3>
              <p>{post.text}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
