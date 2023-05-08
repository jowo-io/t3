import React, { useEffect, BaseSyntheticEvent } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

import Button from "@/client/ui/atoms/Button";
import { env } from "@/env.mjs";
import { User } from "@/schema/db";
import Spinner from "@/client/ui/atoms/Spinner";
import {
  UpdateAccountValidation,
  updateAccountValidation,
} from "@/schema/validation";

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

type Props = {
  onSubmit: (values: UpdateAccountValidation) => void;
  onUpload: (e?: BaseSyntheticEvent) => void;
  account?: User;
};

const AccountEditScreen = ({ onSubmit, onUpload, account }: Props) => {
  const methods = useZodForm({ schema: updateAccountValidation });

  useEffect(() => {
    methods.reset({
      name: account?.name || "",
    });
  }, [account?.name]);

  if (!account) {
    return <Spinner />;
  }

  return (
    <div className="flex w-full max-w-xs flex-col gap-2 py-2">
      <h2 className="mb-5 text-3xl font-bold text-white">Your account</h2>

      <div>
        <h3 className="mb-2 text-lg font-bold text-white">Avatar image</h3>
        {account?.image && (
          <img
            alt="Avatar image"
            className="mb-2"
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
          className="m-0 rounded-sm border-black bg-slate-500 p-2 font-bold text-white"
        />
      </div>

      <hr className="my-8 h-px w-full border-0 bg-white" />
      <form
        onSubmit={methods.handleSubmit(async (values) => {
          await onSubmit(values);
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

        <Button type="submit" disabled={methods.formState.isSubmitting}>
          {methods.formState.isSubmitting ? (
            <Spinner size="small" intent="secondary" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AccountEditScreen;
