import React, { useEffect, BaseSyntheticEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

import Button from "@/client/ui/atoms/Button";
import { env } from "@/env.mjs";
import { User } from "@/schema/db";
import Spinner from "@/client/ui/atoms/Spinner";
import Input from "@/client/ui/zod/Input";
import {
  UpdateAccountValidation,
  updateAccountValidation,
} from "@/schema/validation";
import Avatar from "@/client/ui/atoms/Avatar";
import Header from "@/client/ui/atoms/Header";

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

export interface Props {
  onSubmit: (values: UpdateAccountValidation) => void;
  onUpload: (e?: BaseSyntheticEvent) => void;
  account?: User;
}

const AccountEditScreen = ({ onSubmit, onUpload, account }: Props) => {
  const methods = useZodForm({ schema: updateAccountValidation });

  useEffect(() => {
    methods.reset({ name: account?.name || "" });
  }, [account?.name, methods]);

  if (!account) {
    return <Spinner />;
  }

  return (
    <div className="w-full">
      <Header tag="h2">Your account</Header>

      <div>
        <Header tag="h4">Avatar image</Header>
        {account?.image && (
          <Avatar
            size="xl"
            className="mb-sm"
            src={env.NEXT_PUBLIC_STORAGE_URL + account?.image}
          />
        )}
        <input
          type="file"
          accept="image/png, image/jpeg, image/gif, image/webp"
          onChange={methods.handleSubmit(async (values, e) => {
            await onUpload(e);
            await onSubmit({ isImage: true });
          })}
          disabled={methods.formState.isSubmitting}
          className="m-0 rounded-lg border-black bg-gray-400 p-xs font-bold text-white"
        />
      </div>

      <hr className="mx-auto bg-white" />

      <Header tag="h4">Account details</Header>

      <form
        onSubmit={methods.handleSubmit(async (values) => {
          await onSubmit(values);
        })}
      >
        <Input
          label="Email"
          name="email"
          type="email"
          value={account?.email || ""}
          disabled
        />

        <Input
          label="Name"
          placeholder="e.g. John Smith"
          error={methods.formState.errors.name?.message}
          {...methods.register("name")}
        />

        <Button type="submit" disabled={methods.formState.isSubmitting}>
          {methods.formState.isSubmitting ? (
            <Spinner size="sm" intent="secondary" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AccountEditScreen;
