import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth/next";
import { getProviders, getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { authOptions } from "@/server/auth";
import BasicTemplate from "@/client/ui/templates/Basic";
import Head from "@/client/ui/snowflakes/Head";
import SigninScreen from "@/screens/Auth/Signin";
import { api } from "@/client/utils/api";
import { useEffect } from "react";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = (await getProviders()) ?? [];
  // const csrfToken = await getCsrfToken(ctx);

  return {
    props: { providers },
  };
};

export default function SigninPage({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    query: { callbackUrl },
  } = useRouter();
  const createLnAuth = api.lnauth.create.useMutation();
  const lnurl = createLnAuth?.data?.login || "";
  const k1 = createLnAuth?.data?.k1 || "";
  const getLnAuth = api.lnauth.get.useQuery(
    { k1 },
    {
      enabled: !!k1,
      refetchInterval: 1000,
      onSuccess: async (result) => {
        if (!result?.lnAuth) return;
        const options = {
          k1: result.lnAuth.k1,
          pubkey: result.lnAuth.pubkey,
          callbackUrl: callbackUrl as string,
        };
        await signIn("lightning", options);
      },
    }
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (lnurl) {
      timer = setTimeout(() => createLnAuth.reset(), 2 * 60 * 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [lnurl, createLnAuth]);

  return (
    <BasicTemplate>
      <Head description="This is a demo app" title="Demo app" />

      <SigninScreen
        onSubmitEmail={async (values) => {
          const options = {
            email: values.email,
            callbackUrl: callbackUrl as string,
          };
          // console.log(options);
          await signIn("email", options);
        }}
        lnurl={lnurl}
        onSubmitLightning={() => createLnAuth.mutateAsync(undefined, {})}
      />

      {/* <div className="w-full">
        {Object.values(providers).map((provider) => {
          return (
            <div key={provider.name} className="flex justify-center">
              <Button className="mb-sm" onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </Button>
            </div>
          );
        })}
      </div> */}
    </BasicTemplate>
  );
}
