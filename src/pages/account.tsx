import React, { PropsWithChildren, BaseSyntheticEvent } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

import Head from "@/ui/snowflakes/Head";
import BasicTemplate from "@/ui/templates/Basic";
import { api } from "@/utils/client/api";
import { resizeImageBlob } from "@/utils/client/pica";
import AccountEditScreen, { fileExt } from "@/screens/Account/Edit";

export default function AccountPage({}: PropsWithChildren) {
  const utils = api.useContext();
  const { data: session, update: updateSession } = useSession();
  const signedUrl = api.account.createSignedAvatarUrl.useMutation();
  const updateAccount = api.account.update.useMutation();
  const getAccount = api.account.get.useQuery(undefined, {
    enabled: session?.user !== undefined,
  });
  const account = getAccount?.data?.[0];

  const onUpload = async (e?: BaseSyntheticEvent) => {
    try {
      const file = e?.target?.files?.[0];
      if (!file) return;
      const blob = await resizeImageBlob(file, `image/${fileExt}`, 200);
      const url = await signedUrl.mutateAsync({ size: blob.size });
      await axios.put(url, blob);
    } catch (e) {
      console.error(e);
    } finally {
      if (e?.target?.value) {
        e.target.value = "";
      }
    }
  };

  return (
    <BasicTemplate>
      <Head description="View and modify your account" title="Your account" />
      <AccountEditScreen
        onSubmit={async (values) => {
          const user = await updateAccount.mutateAsync(values, {
            onSuccess: () => {
              updateSession(user);
              utils.account.invalidate();
            },
          });
        }}
        onUpload={onUpload}
        account={account}
      />
    </BasicTemplate>
  );
}
