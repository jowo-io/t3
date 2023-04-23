import { type NextPage } from "next";

import Header from "@/ui/Header";

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4">
      <Header />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl text-white">Welcome</h1>
        <p className="text-white">This is a demo app.</p>
      </div>
    </main>
  );
};

export default Home;
