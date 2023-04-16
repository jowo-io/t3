import { useEffect, useState } from "react";
import { type NextPage } from "next";
import Pica from "pica";
import axios from "axios";
import { api } from "@/utils/api";

function resize(blob: Blob, mimeType: string, size: number): Promise<Blob> {
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  const image = new Image();
  setTimeout(() => (image.src = URL.createObjectURL(blob)));
  return new Promise((resolve, reject) => {
    image.onload = () => {
      const aspect = image.width / image.height;
      const width = image.width > image.height ? size : size * aspect;
      const height = image.width > image.height ? size / aspect : size;
      canvas.width = width;
      canvas.height = height;
      const pica = Pica();
      pica
        .resize(image, canvas, {})
        .then((result) => pica.toBlob(result, mimeType, 0.9))
        .then((resizedBlob) => resolve(resizedBlob))
        .catch((error) => reject(error));
    };
  });
}

const Home: NextPage = () => {
  const hello = api.account.hello.useQuery({ text: "from account tRPC" });
  const signedUrl = api.account.createSignedAvatarUrl.useMutation();
  const updateAccount = api.account.updateAccount.useMutation();
  const getAccount = api.account.getAccount.useQuery();
  const [account, setAccount] = useState<any>();
  const [name, setName] = useState("");

  useEffect(() => {
    const newAccount = getAccount?.data?.[0];
    setAccount(newAccount);
    setName(newAccount?.name || "");
  }, [getAccount?.data]);

  useEffect(() => {
    const newAccount = updateAccount?.data?.[0];
    setAccount(newAccount);
    setName(newAccount?.name || "");
  }, [updateAccount?.data]);

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    (async () => {
      const url = await signedUrl.mutateAsync();
      if (!url) return;
      const blob = await resize(file, "image/webp", 200);

      const size = (blob.size / (1024 * 1024)).toFixed(2);
      console.log(`Resized file size is ${size} MB`);

      console.log("resized", blob);
      await axios.put(url, blob);
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
        accept="image/png, image/jpeg, image/gif, image/webp"
        onChange={uploadPhoto}
      />
      {account?.image && (
        <img src={process.env.STORAGE_PUBLIC_URL + account?.image} />
      )}
      <hr className="my-8 h-px w-full border-0 bg-white" />

      <div>
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          type="text"
          value={account?.email as string}
          disabled
        />
      </div>

      <div>
        <label htmlFor="name">Name</label>
        <br />
        <input
          id="name"
          type="text"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateAccount.mutate({ name })}
          disabled={updateAccount.isLoading}
        >
          {updateAccount.isLoading ? "Loading ..." : "Update"}
        </button>
      </div>
    </main>
  );
};

export default Home;
