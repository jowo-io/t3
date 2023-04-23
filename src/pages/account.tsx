import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { type NextPage } from "next";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

import { api } from "@/utils/client/api";
import { resizeImageBlob } from "@/utils/client/pica";

import Header from "@/ui/Header";

import { env } from "@/env.mjs";

// validation schema is used by server
export const validationSchema = z.object({
  isImage: z.boolean().optional(),
  name: z.string().min(2).max(100).optional(),
});

export const fileExt = "webp";

function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }
) {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  });

  return form;
}

const AccountPage: NextPage = () => {
  const utils = api.useContext();
  const { data: session } = useSession();
  const signedUrl = api.account.createSignedAvatarUrl.useMutation();
  const updateAccount = api.account.update.useMutation();
  const getAccount = api.account.get.useQuery(
    undefined, // no input
    { enabled: session?.user !== undefined }
  );
  const account = getAccount?.data?.[0];

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const blob = await resizeImageBlob(file, `image/${fileExt}`, 200);
      const url = await signedUrl.mutateAsync({ size: blob.size });
      await axios.put(url, blob);
      updateAccount.mutateAsync(
        { isImage: true },
        { onSuccess: () => utils.account.invalidate() }
      );
    } catch (e) {
      console.error(e);
    } finally {
      e.target.value = "";
    }
  };

  const methods = useZodForm({ schema: validationSchema });

  useEffect(() => {
    methods.reset({
      name: account?.name || "",
    });
  }, [account?.name]);

  const isLoading = updateAccount.isLoading || !account;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] p-4">
      <Header />

      <div className="flex w-full max-w-xs flex-col gap-2 py-2">
        <h2 className="mb-5 text-3xl font-bold text-white">Your account</h2>

        <div>
          <h3 className="text-lg font-bold text-white">Avatar image</h3>
          {account?.image && (
            <img src={env.NEXT_PUBLIC_STORAGE_URL + account?.image} />
          )}
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif, image/webp"
            onChange={uploadPhoto}
            disabled={isLoading}
            className="m-0 rounded-sm border-black bg-slate-500 p-2 font-bold text-white"
          />
        </div>

        <hr className="my-8 h-px w-full border-0 bg-white" />
        <form
          onSubmit={methods.handleSubmit(async (values) => {
            await updateAccount.mutateAsync(values);
          })}
          className="space-y-2"
        >
          <h3 className="text-lg font-bold text-white">Account details</h3>

          <div>
            <label>
              <span className="text-white">Email</span>
              <br />
              <input
                id="email"
                type="text"
                className="w-full border p-1"
                value={account?.email || ""}
                disabled
              />
            </label>
          </div>

          <div>
            <label>
              <span className="text-white">Name</span>
              <br />
              <input
                {...methods.register("name")}
                className="w-full border p-1"
              />
            </label>
            {methods.formState.errors.name?.message && (
              <p className="text-red-700">
                {methods.formState.errors.name?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="m-0 rounded-sm border-black bg-slate-500 p-2 font-bold text-white"
          >
            {isLoading ? "Loading" : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AccountPage;
