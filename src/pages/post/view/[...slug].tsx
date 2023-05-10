import React from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { eq } from "drizzle-orm";

import Head from "@/client/ui/snowflakes/Head";
import BasicTemplate from "@/client/ui/templates/Basic";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { postTable, userTable } from "@/schema/db";
import PostViewScreen from "@/screens/Post/View";
import ErrorNotFoundScreen from "@/screens/Error/NotFound";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { user: currentUser } = await getServerAuthSession(ctx);

  // if no id is provided return no post
  const postId = ctx.query?.slug?.[0];

  if (typeof postId === "string") {
    // attempt post select
    const data = await db
      .select({
        post: {
          id: postTable.id,
          title: postTable.title,
          text: postTable.text,
          slug: postTable.slug,
          summary: postTable.summary,
          isPublished: postTable.isPublished,
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
    if (post && user && (post.isPublished || currentUser?.id === user.id)) {
      return { props: { post, user } };
    }
  }

  // otherwise return no post
  return { notFound: true };
};

export default function ViewPostPage({
  post,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <BasicTemplate>
      <Head description={post.summary} title={post.title} />
      <PostViewScreen post={post} user={user} />
    </BasicTemplate>
  );
}
