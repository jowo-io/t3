import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/client/ui/atoms/Button";
import Spinner from "@/client/ui/atoms/Spinner";
import { addPostValidation, AddPostValidation } from "@/schema/validation";

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
  onSubmit: (values: AddPostValidation) => void;
};

export default function PostAddScreen({ onSubmit }: Props) {
  const methods = useZodForm({
    schema: addPostValidation,
    defaultValues: {
      title: "",
      text: "",
    },
  });

  return (
    <div className="w-full">
      <h2 className="mb-sm text-white">Add a post</h2>
      <form
        onSubmit={methods.handleSubmit(async (values) => {
          await onSubmit(values);
          methods.reset();
        })}
      >
        <div className="mb-sm">
          <label className="block text-white" htmlFor="title">
            Title
          </label>
          <input {...methods.register("title")} className="p-1 w-full border" />
          {methods.formState.errors.title?.message && (
            <div className="mt-xs text-negative">
              {methods.formState.errors.title?.message}
            </div>
          )}
        </div>

        <div className="mb-sm">
          <label className="block text-white" htmlFor="text">
            Text
          </label>
          <textarea
            {...methods.register("text")}
            className="p-1 block w-full border"
          />
          {methods.formState.errors.text?.message && (
            <div className="mt-xs text-negative">
              {methods.formState.errors.text?.message}
            </div>
          )}
        </div>

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
}
