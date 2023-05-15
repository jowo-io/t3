import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";

import Button from "@/client/ui/atoms/Button";
import Spinner from "@/client/ui/atoms/Spinner";
import Input from "@/client/ui/zod/Input";
import { emailAuthValidation, EmailAuthValidation } from "@/schema/validation";

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
  onSubmit: (values: EmailAuthValidation) => void;
}

const Email = ({ onSubmit }: Props) => {
  const methods = useZodForm({ schema: emailAuthValidation });

  return (
    <form
      onSubmit={methods.handleSubmit(async (values) => {
        await onSubmit(values);
      })}
    >
      <Input
        label="Email"
        placeholder="e.g. hello@website.com"
        error={methods.formState.errors.email?.message}
        {...methods.register("email")}
      />

      <Button
        type="submit"
        disabled={methods.formState.isSubmitting}
        className="w-full"
      >
        {methods.formState.isSubmitting ? (
          <Spinner size="sm" intent="secondary" />
        ) : (
          "Sign in with Email"
        )}
      </Button>
    </form>
  );
};

export default Email;
