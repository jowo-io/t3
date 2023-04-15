import { type NextPage } from "next";

import { api } from "@/utils/api";

const Home: NextPage = () => {
  const hello = api.account.hello.useQuery({ text: "from account tRPC" });
  const account = api.account.getAccount.useQuery();
  const signedUrl = api.account.getSignedAvatarUrl.useQuery();

  console.log("account:", account.data);
  console.log("signedUrl:", signedUrl.data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl text-white">
          {hello.data ? hello.data.greeting : "Loading tRPC query..."}
        </p>
      </div>
      <hr className="my-8 h-px w-full border-0 bg-white" />
      <pre className="text-white">{JSON.stringify(account.data, null, 2)}</pre>
    </main>
  );
};

export default Home;
