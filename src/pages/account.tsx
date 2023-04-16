import { useEffect, useState } from "react";
import { type NextPage } from "next";
import axios from "axios";
import { api } from "@/utils/api";

const Home: NextPage = () => {
  const [account, setAccount] = useState();
  const hello = api.account.hello.useQuery({ text: "from account tRPC" });
  const signedUrl = api.account.createSignedAvatarUrl.useMutation();
  const updateAccount = api.account.updateAccount.useMutation();
  const getAccount = api.account.getAccount.useQuery();

  useEffect(() => {
    console.log("get account");
    setAccount(getAccount?.data?.[0]);
  }, [getAccount?.data]);

  useEffect(() => {
    console.log("update account");
    setAccount(updateAccount?.data?.[0]);
  }, [updateAccount?.data]);

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    (async () => {
      const url = await signedUrl.mutateAsync();
      if (!url) return;

      await axios.put(url, file);
      updateAccount.mutate({ isImage: true });
    })();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl text-white">
          {hello.data ? hello.data.greeting : "Loading tRPC query..."}
        </p>
      </div>
      <hr className="my-8 h-px w-full border-0 bg-white" />
      <pre className="text-white">{JSON.stringify(account, null, 2)}</pre>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={uploadPhoto}
      />
      {account?.image && (
        <img src={process.env.STORAGE_PUBLIC_URL + account?.image} />
      )}{" "}
    </main>
  );
};

export default Home;
