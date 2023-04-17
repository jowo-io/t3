import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { eq, and } from "drizzle-orm/expressions";

import { authOptions } from "@/server/auth";
import { db } from "@/server/db";
import { posts } from "@/db/schema";

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user?.id;
  if (!session || !userId) return { props: { feed: [] } };

  const feed = await db
    .select()
    .from(posts)
    .where(and(eq(posts.user_id, userId), eq(posts.published, true)));

  console.log("feed", userId, feed);
  return {
    props: {
      // workaround to serialize date object
      feed: JSON.parse(JSON.stringify(feed)) as typeof feed,
    },
  };
};

export default function PostsPage({
  feed,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();

  return (
    <>
      {session && (
        <div>
          <h1>posts</h1>
          <hr />
          {feed.map((post) => (
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
