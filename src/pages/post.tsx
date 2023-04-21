import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import { eq, and } from "drizzle-orm/expressions";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { postTable } from "@/db/schema";
import PostScreen from "@/screens/Post/Post";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { user } = await getServerAuthSession(ctx);
  if (!user?.id) return { props: { posts: [] } };

  const posts = await db
    .select()
    .from(postTable)
    .where(and(eq(postTable.userId, user.id), eq(postTable.published, true)));

  console.log("ssr posts", posts);

  return {
    props: { posts },
  };
};

export default function PostsPage({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();

  console.log("ssr posts", posts);

  return <>{session ? <PostScreen /> : "Please login to see this page"}</>;
}
