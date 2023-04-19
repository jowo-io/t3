import { type NextPage } from "next";

import AuthShowcase from "@/ui/AuthShowcase";

import { api } from "@/utils/client/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const example = api.example.getExample.useQuery();

  console.log("example:", example.data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl text-white">
          {hello.data ? hello.data.greeting : "Loading tRPC query..."}
        </p>
        <AuthShowcase />
      </div>
    </main>
  );
};

export default Home;
